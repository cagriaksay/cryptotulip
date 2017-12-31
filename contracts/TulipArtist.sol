pragma solidity ^0.4.0;

import './OpenZeppelin.sol';
import './Land.sol';

//*********************************************************************
// TulipArtist


contract TulipArtist is Destructible, Pausable, BasicNFT {

    function TulipArtist() public {
        // tulip-zero
        _createTulip(bytes32(-1), 0, 0, 0, address(0));
        paused = true;
    }

    string public name = 'Tulip Artist';
    string public symbol = 'TULIP';

    uint32 internal constant MONTHLY_BLOCKS = 172800;

    struct Tulip {
        bytes32 genes;
        uint64 block;
        uint64 foundation;
        uint64 inspiration;
        uint64 generation;
    }

    Tulip[] tulips;

    uint256 public artistFees = 10 finney;

    function setArtistFees(uint256 _newFee) external onlyOwner {
        artistFees = _newFee;
    }

    // Commission TulipArtist for abstract deconstructed art.
    // You: I'd like a painting please. Us my painting for the foundation
    //      and use that other painting accross the street as inspiration.
    // Artist: That'll be 10 finneys. Come back one block later.
    function commissionArt(uint256 _foundation, uint256 _inspiration)
      external payable whenNotPaused returns (uint) {

        require(msg.sender == tokenOwner[_foundation]);
        require(msg.value >= artistFees);
        return _createTulip(0, _foundation, _inspiration, tulips[_foundation].generation + 1, msg.sender);
    }

    // Called to reveal commissioned art.
    // Needs to be called at least 1 block after commissioning.
    function revealArt(uint256 _id) external whenNotPaused {
        require(tulips[_id].genes == bytes32(0));
        _creativeProcess(_id);
    }

    // [Optional] name your masterpiece.
    // Needs to be funny.
    function nameArt(uint256 _id, string _newName) external whenNotPaused {
        require(msg.sender == tokenOwner[_id]);
        _tokenMetadata[_id] = _newName;
        MetadataUpdated(_id, msg.sender, _newName);
    }


    // Owner methods

    uint256 internal constant ORIGINAL_ARTWORK_LIMIT = 50000;
    uint256 internal originalCount = 0;

    // Let's the caller create an original artwork with given genes.
    // For the first month, everyone can create 1 original artwork.
    // After that, only the owner can create an original, up to 10k pieces.
    function originalArtwork(bytes32 _genes, address _owner) external payable {
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
                (msg.value >= artistFees && _virtualLength[msg.sender] == 0)
                || msg.sender == owner);
        }

        _createTulip(_genes, 0, 0, 0, newOwner);
    }

    // Let's owner withdraw contract balance
    function withdraw() external onlyOwner {
        owner.transfer(this.balance);
    }



    // *************************************************************************
    // Internal

    function _creativeProcess(uint _id) internal {
        Tulip memory tulip = tulips[_id];

        require(tulip.genes == bytes32(0));
        require(tulip.block < block.number);
        require(tulip.block > block.number - 256);

        bytes32 rand = block.blockhash(tulip.block);

        Tulip memory foundation = tulips[tulip.foundation];
        Tulip memory inspiration = tulips[tulip.inspiration];

        for (uint8 i =0; i<32; i++) {
            if ( uint8(rand[i]) % 10 < 9) {
                tulips[_id].genes |= bytes32(uint8(rand[i]) % 10 < 7 ?
                    foundation.genes[i] : inspiration.genes[i]) >> (i * 8);
            }
            else {
                tulips[_id].genes |= bytes32(keccak256(rand[i])[i]) >> (i * 8);
            }
        }
    }

    function _createTulip(
        bytes32 _genes,
        uint256 _foundation,
        uint256 _inspiration,
        uint256 _generation,
        address _owner
    ) internal returns (uint) {

        Tulip memory newTulip = Tulip({
            genes: _genes,
            block: uint64(block.number),
            foundation: uint64(_foundation),
            inspiration: uint64(_inspiration),
            generation: uint64(_generation)
        });

        uint256 newTulipId = tulips.push(newTulip);
        _transfer(0, _owner, newTulipId);
        return newTulipId;
    }

}




