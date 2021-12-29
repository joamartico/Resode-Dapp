// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Resode {


    constructor() {
        addCategory('All');
        addCategory('DeFi');
        addCategory('Web3');
        addCategory('Bitcoin');
        addCategory('Ethereum');
        addCategory('Solana');

    }

    event PostCreated(
        bytes32 postId,
        address indexed postOwner,
        bytes32 contentId,
        bytes32 indexed parentPostId,
        bytes32 indexed categoryId,
        string contentUri
    );

    event ContentAdded(bytes32 indexed contentId, string contentUri);

    event Voted(
        bytes32 indexed postId,
        address indexed postOwner,
        address indexed voter,
        uint80 reputationPostOwner,
        uint80 reputationVoter,
        int40 postVotes,
        bool up,
        uint8 reputationAmount
    );

    event CategoryCreated(bytes32 indexed categoryId, string categoryName);

    struct Post {
        address postOwner;
        bytes32 contentId;
        bytes32 parentPostId;
        bytes32 categoryId;
        int40 votes;
    }

    mapping(bytes32 => Post) public postRegistry;
    mapping(bytes32 => string) public categoryRegistry;
    mapping(bytes32 => string) public contentRegistry; // array de urls a guardar en IPFS
    mapping(address => mapping(bytes32 => uint80)) public reputationRegistry; // cada address tiene una reputacion (uint80) en cada categoría (bytes32)
    mapping(address => mapping(bytes32 => bool)) public voteRegistry; // cada address tiene un registro de cada postId al que votó

    function createPost(
        bytes32 _categoryId,
        bytes32 _parentPostId,
        string calldata _contentUri
    ) external {
        address _postOwner = msg.sender;
        bytes32 _contentId = keccak256(abi.encode(_contentUri));
        bytes32 _postId = keccak256(abi.encodePacked(_postOwner, _parentPostId, _contentId));
        contentRegistry[_contentId] = _contentUri;
        postRegistry[_postId].postOwner = _postOwner;
        postRegistry[_postId].contentId = _contentId;
        postRegistry[_postId].parentPostId = _parentPostId;
        postRegistry[_postId].categoryId = _categoryId;
        emit ContentAdded(_contentId, _contentUri);
        emit PostCreated(_postId, _postOwner, _contentId, _parentPostId, _categoryId, _contentUri);
    }

    function validateReputationChange(
        address _sender,
        bytes32 _categoryId,
        uint8 _reputationChange
    ) internal view returns (bool _result) {
        uint80 _reputation = reputationRegistry[_sender][_categoryId];

        if (_reputation < 2) {
            _reputationChange == 1 ? _result = true : _result = false;
        } else {
            2**_reputationChange <= _reputation ? _result = true : _result = false;
        }
    }

    function vote(
        bytes32 _postId,
        uint8 _reputationChange,
        bool _up
    ) external {
        address _voter = msg.sender;
        bytes32 _categoryId = postRegistry[_postId].categoryId;
        address _contributor = postRegistry[_postId].postOwner;
        require(_voter != _contributor, 'you cannot vote your own posts');
        require(voteRegistry[_voter][_postId] == false, 'you have already voted this post');
        require(
            validateReputationChange(_voter, _categoryId, _reputationChange),
            "you don't have enough reputation to vote this post"
        );

        if (_up) {
            postRegistry[_postId].votes += 1;
            reputationRegistry[_contributor][_categoryId] += _reputationChange;
        } else {
            if (postRegistry[_postId].votes > 0) {
                postRegistry[_postId].votes -= 1;
            }

            if (reputationRegistry[_contributor][_categoryId] >= _reputationChange) {
                reputationRegistry[_contributor][_categoryId] -= _reputationChange;
            }
        }

        voteRegistry[_voter][_postId] = true;
        emit Voted(
            _postId,
            _contributor,
            _voter,
            reputationRegistry[_contributor][_categoryId],
            reputationRegistry[_voter][_categoryId],
            postRegistry[_postId].votes,
            _up,
            _reputationChange
        );
    }

    function addCategory(string memory _categoryName) public {
        bytes32 _categoryId = keccak256(abi.encode(_categoryName));
        categoryRegistry[_categoryId] = _categoryName;
        emit CategoryCreated(_categoryId, _categoryName);
    }

    function getContent(bytes32 _contentId) public view returns (string memory) {
        return contentRegistry[_contentId];
    }

    function getCategory(bytes32 _categoryId) public view returns (string memory) {
        return categoryRegistry[_categoryId];
    }

    function getReputation(address _address, bytes32 _categoryID) public view returns (uint80) {
        return reputationRegistry[_address][_categoryID];
    }

    function getPost(bytes32 _postId)
        public
        view
        returns (
            address,
            bytes32,
            bytes32,
            bytes32,
            int72
        )
    {
        return (
            postRegistry[_postId].postOwner,
            postRegistry[_postId].contentId,
            postRegistry[_postId].parentPostId,
            postRegistry[_postId].categoryId,
            postRegistry[_postId].votes
        );
    }
}
