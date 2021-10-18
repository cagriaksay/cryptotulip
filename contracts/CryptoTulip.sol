// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "./ERC721/ERC721.sol";
import "./ERC721/Ownable.sol";

//*************************//
// CryptoTulip             //
//                         //
// https://cryptotulip.co  //
//*************************//
contract CryptoTulip is ERC721, Ownable {

    constructor() ERC721("CryptoTulip", "TULIP") {
        _setBaseURI("https://api.cryptotulip.co/tulip/");
    }

    struct Tulip {
        bytes32 genome;
        uint64 block;
        uint64 foundation;
        uint64 inspiration;
        uint64 generation;
    }

    Tulip[] tulips;
    mapping(address => string) public usernames;
    mapping(uint => string) public names;

    uint256 internal constant ARTIST_FEES = 1e15; // 1 finney
    uint256 internal constant ORIGINAL_ARTWORK_LIMIT = 100;
    uint256 internal constant COMMISSION_ARTWORK_LIMIT = 1000;

    function getTulip(uint256 _id) external view
      returns (
        bytes32 genome,
        uint64 blockNumber,
        uint64 foundation,
        uint64 inspiration,
        uint64 generation
    ) {
        Tulip storage tulip = tulips[_id];

        genome = tulip.genome;
        blockNumber = tulip.block;
        foundation = tulip.foundation;
        inspiration = tulip.inspiration;
        generation = tulip.generation;
    }
    
    // [Optional] name your masterpiece.
    // Needs to be funny.
    function nameArt(uint256 _id, string memory _newName) external {
        require(msg.sender == ownerOf(_id));
        names[_id] = _newName;
    }

    function setUsername(string memory _username) external {
        usernames[msg.sender] = _username;
    }

    // Commission CryptoTulip for abstract deconstructed art.
    // You: I'd like a painting please. Use my painting for the foundation
    //      and use that other painting accross the street as inspiration.
    // Artist: That'll be 1 finney. Come back one block later.
    function commissionArt(uint256 _foundation, uint256 _inspiration)
      external payable returns (uint)
    {
        require((totalSupply() < COMMISSION_ARTWORK_LIMIT) || (msg.value >= 1000 * ARTIST_FEES));
        require(msg.sender == ownerOf(_foundation));
        require(msg.value >= ARTIST_FEES);
        uint256 _id = _createTulip(bytes32(0), _foundation, _inspiration, tulips[_foundation].generation + 1, msg.sender);
        return _creativeProcess(_id);
    }

    // Lets the caller create an original artwork with given genome.
    function originalArtwork(bytes32 _genome) external payable returns (uint) {
        require(totalSupply() < ORIGINAL_ARTWORK_LIMIT);
        require(msg.value >= ARTIST_FEES);
        return _createTulip(_genome, 0, 0, 0, msg.sender);
    }
    
    // Lets owner withdraw contract balance
    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    // *************************************************************************
    // Internal

    function _creativeProcess(uint _id) internal returns (uint) {
        Tulip memory tulip = tulips[_id];
        require(tulip.genome == bytes32(0));
        // This is not random. People will know the result before
        // executing this, because it's based on the last block.
        // But that's ok.
        bytes32 hash = keccak256(abi.encodePacked(blockhash(block.number - 1), blockhash(block.number - 2), msg.sender));
        Tulip memory foundation = tulips[tulip.foundation];
        Tulip memory inspiration = tulips[tulip.inspiration];
        bytes32 genome = bytes32(0);

        for (uint8 i = 0; i < 32; i++) {
            uint8 r = uint8(hash[i]);
            uint8 gene;

            if (r % 10 < 2) {
               gene = uint8(foundation.genome[i]) - 8 + (r / 16);
            } else if (r % 100 < 99) {
               gene = uint8(r % 10 < 7 ? foundation.genome[i] : inspiration.genome[i]);
            } else {
                gene = uint8(uint(keccak256(abi.encodePacked(r))));
            }

            genome = bytes32(uint(gene)) | (genome << 8);
        }

        tulips[_id].genome = genome;
        return _id;
    }

    function _createTulip(
        bytes32 _genome,
        uint256 _foundation,
        uint256 _inspiration,
        uint256 _generation,
        address _owner
    ) internal returns (uint)
    {
        Tulip memory newTulip = Tulip({
            genome: _genome,
            block: uint64(block.number),
            foundation: uint64(_foundation),
            inspiration: uint64(_inspiration),
            generation: uint64(_generation)
        });

        tulips.push(newTulip);
        uint256 newTulipId = tulips.length - 1;
        _safeMint(_owner, newTulipId);
        return newTulipId;
    }
}
