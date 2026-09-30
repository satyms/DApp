// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract CertVerify {

    // ─── State Variables ───────────────────────────────────────────────────────
    address public owner;
    mapping(address => bool) public issuers;
    mapping(bytes32 => Certificate) private certificates;

    // ─── Data Structures ───────────────────────────────────────────────────────
    struct Certificate {
        string  recipientName;
        bytes32 certificateHash;
        address issuerAddress;
        uint256 issuedDate;
        uint256 expiryDate;
        string  courseName;
        string  grade;
        bool    isActive;
    }

    // ─── Events ────────────────────────────────────────────────────────────────
    event CertificateIssued(
        bytes32 indexed certHash,
        address indexed issuer,
        string  recipientName,
        string  courseName
    );
    event CertificateRevoked(bytes32 indexed certHash, address indexed revokedBy);

    // ─── Modifiers ─────────────────────────────────────────────────────────────
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    modifier onlyIssuer() {
        require(issuers[msg.sender], "Only authorized issuers can call this");
        _;
    }

    // ─── Constructor ───────────────────────────────────────────────────────────
    constructor() {
        owner = msg.sender;
        issuers[msg.sender] = true; // deployer is first issuer
    }

    // ─── Issuer Management ─────────────────────────────────────────────────────
    function addIssuer(address _issuer) public onlyOwner {
        require(_issuer != address(0), "Invalid address");
        issuers[_issuer] = true;
    }

    function removeIssuer(address _issuer) public onlyOwner {
        issuers[_issuer] = false;
    }

    // ─── Core Functions ────────────────────────────────────────────────────────

    /// @notice Issue a new certificate. Only authorized issuers can call this.
    function issueCertificate(
        string  memory _recipientName,
        string  memory _courseName,
        string  memory _grade,
        uint256        _expiryDate
    ) public onlyIssuer returns (bytes32) {
        require(bytes(_recipientName).length > 0, "Recipient name required");
        require(bytes(_courseName).length > 0,    "Course name required");
        require(_expiryDate > block.timestamp,    "Expiry must be in the future");

        // Generate a unique deterministic hash from certificate data + timestamp
        bytes32 certHash = keccak256(
            abi.encodePacked(
                _recipientName,
                _courseName,
                _grade,
                msg.sender,
                block.timestamp
            )
        );

        require(certificates[certHash].issuedDate == 0, "Certificate already exists");

        certificates[certHash] = Certificate({
            recipientName:   _recipientName,
            certificateHash: certHash,
            issuerAddress:   msg.sender,
            issuedDate:      block.timestamp,
            expiryDate:      _expiryDate,
            courseName:      _courseName,
            grade:           _grade,
            isActive:        true
        });

        emit CertificateIssued(certHash, msg.sender, _recipientName, _courseName);
        return certHash;
    }

    /// @notice Verify a certificate — returns validity status string.
    function verifyCertificate(bytes32 _certHash)
        public view
        returns (bool valid, string memory status, Certificate memory cert)
    {
        cert = certificates[_certHash];

        if (cert.issuedDate == 0) {
            return (false, "NOT_FOUND", cert);
        }
        if (!cert.isActive) {
            return (false, "REVOKED", cert);
        }
        if (block.timestamp > cert.expiryDate) {
            return (false, "EXPIRED", cert);
        }
        return (true, "VALID", cert);
    }

    /// @notice Retrieve raw certificate data.
    function getCertificate(bytes32 _certHash)
        public view
        returns (Certificate memory)
    {
        require(certificates[_certHash].issuedDate != 0, "Certificate not found");
        return certificates[_certHash];
    }

    /// @notice Revoke a certificate. Only issuers can revoke.
    function revokeCertificate(bytes32 _certHash) public onlyIssuer {
        require(certificates[_certHash].issuedDate != 0, "Certificate not found");
        require(certificates[_certHash].isActive,         "Already revoked");
        certificates[_certHash].isActive = false;
        emit CertificateRevoked(_certHash, msg.sender);
    }
}
