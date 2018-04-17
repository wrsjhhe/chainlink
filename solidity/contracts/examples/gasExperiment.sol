pragma solidity ^0.4.18;

import "../Buffer.sol";
import "../CBOR.sol";

contract gasExperiment {

  struct Run {
    bytes32 id;
    Buffer.buffer buf;
  }

  function versionA() public {
    Run memory run;
    Buffer.init(run.buf, 64);

    run.id = keccak256(this);

    CBOR.startMap(run.buf);
  }

  function versionB() public {
    Run memory run;

    run.id = keccak256(this);

    Buffer.init(run.buf, 64);
    CBOR.startMap(run.buf);
  }

}
