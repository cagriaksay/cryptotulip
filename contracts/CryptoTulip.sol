pragma solidity ^0.4.0;

import './OpenZeppelin.sol';
import './Land.sol';

//*********************************************************************
// CryptoTulip


contract CryptoTulip is Destructible, Pausable, BasicNFT {

    function CryptoTulip() public {
        // tulip-zero
        _createTulip(bytes32(-1), 0, 0, 0, address(0));
        paused = false;
    }

    string public name = 'CryptoTulip';
    string public symbol = 'TULIP';

    uint32 internal constant MONTHLY_BLOCKS = 172800;

    // username
    mapping(address => string) public usernames;


    struct Tulip {
        bytes32 genome;
        uint64 block;
        uint64 foundation;
        uint64 inspiration;
        uint64 generation;
    }

    Tulip[] tulips;

    uint256 public artistFees = 1 finney;

    function setArtistFees(uint256 _newFee) external onlyOwner {
        artistFees = _newFee;
    }

    function getTulip(uint256 _id) external view
      returns (
        bytes32 genome,
        uint64 blockNumber,
        uint64 foundation,
        uint64 inspiration,
        uint64 generation
    ) {
        require(_id > 0);
        Tulip storage tulip = tulips[_id];

        genome = tulip.genome;
        blockNumber = tulip.block;
        foundation = tulip.foundation;
        inspiration = tulip.inspiration;
        generation = tulip.generation;
    }

    // Commission CryptoTulip for abstract deconstructed art.
    // You: I'd like a painting please. Use my painting for the foundation
    //      and use that other painting accross the street as inspiration.
    // Artist: That'll be 10 finneys. Come back one block later.
    function commissionArt(uint256 _foundation, uint256 _inspiration)
      external payable whenNotPaused returns (uint) {

        require(msg.sender == tokenOwner[_foundation]);
        require(msg.value >= artistFees);
        return _createTulip(bytes32(0), _foundation, _inspiration, tulips[_foundation].generation + 1, msg.sender);
    }

    // Called to reveal commissioned art.
    // Needs to be called at least 1 block after commissioning.
    function revealArt(uint256 _id) external whenNotPaused {
        _creativeProcess(_id);
    }

    // [Optional] name your masterpiece.
    // Needs to be funny.
    function nameArt(uint256 _id, string _newName) external whenNotPaused {
        require(msg.sender == tokenOwner[_id]);
        _tokenMetadata[_id] = _newName;
        MetadataUpdated(_id, msg.sender, _newName);
    }

    function setUsername(string _username) external whenNotPaused {
        usernames[msg.sender] = _username;
    }


    // Owner methods

    uint256 internal constant ORIGINAL_ARTWORK_LIMIT = 50000;
    uint256 internal originalCount = 0;

    // Let's the caller create an original artwork with given genome.
    // For the first month, everyone can create 1 original artwork.
    // After that, only the owner can create an original, up to 10k pieces.
    function originalArtwork(bytes32 _genome, address _owner) external payable {
        address newOwner = _owner;
        if (newOwner == address(0)) {
             newOwner = msg.sender;
        }

        if (block.number > tulips[0].block + MONTHLY_BLOCKS ) {
            require(msg.sender == owner);
            require(originalCount < ORIGINAL_ARTWORK_LIMIT);
            originalCount++;
        } else {
            require(
                (msg.value >= artistFees && _virtualLength[msg.sender] < 10)
                || msg.sender == owner);
        }

        _createTulip(_genome, 0, 0, 0, newOwner);
    }

    // Let's owner withdraw contract balance
    function withdraw() external onlyOwner {
        owner.transfer(this.balance);
    }



    // *************************************************************************
    // Internal

    function _creativeProcess(uint _id) internal {
        Tulip memory tulip = tulips[_id];

        require(tulip.genome == bytes32(0));
        require(tulip.block < block.number);

        bytes32 rand = block.blockhash(tulip.block);

        Tulip memory foundation = tulips[tulip.foundation];
        Tulip memory inspiration = tulips[tulip.inspiration];

        bytes32 genome = bytes32(0);

        for (uint8 i =0; i<32; i++) {
            if (uint8(rand[i]) % 10 < 2) {
              genome |=
                bytes32(uint8(foundation.genome[i]) - 16 + (uint8(keccak256(rand[i])[i])/8)) >> (i * 8);
            }
            else if (uint8(rand[i]) % 10 < 9) {
                genome |= bytes32(uint8(rand[i]) % 10 < 7 ?
                    foundation.genome[i] : inspiration.genome[i]) >> (i * 8);
            }
            else {
                genome |= bytes32(keccak256(rand[i])[i]) >> (i * 8);
            }
        }

        tulips[_id].genome = genome;
    }

    function _createTulip(
        bytes32 _genome,
        uint256 _foundation,
        uint256 _inspiration,
        uint256 _generation,
        address _owner
    ) internal returns (uint) {

        Tulip memory newTulip = Tulip({
            genome: _genome,
            block: uint64(block.number),
            foundation: uint64(_foundation),
            inspiration: uint64(_inspiration),
            generation: uint64(_generation)
        });

        uint256 newTulipId = tulips.push(newTulip) - 1;
        _transfer(0, _owner, newTulipId);
        totalTokens++;
        return newTulipId;
    }

}




