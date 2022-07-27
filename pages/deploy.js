import { W3WalletDriver, useW3Wallet } from "../components/w3wallet";
import { ContractFactory } from 'ethers';
import styles from "../styles/Home.module.css";
import browserSolc from "browser-solc";

const Deploy = () => {
  const [W3Wallet] = useW3Wallet()
  const { eProvider, signer, accounts, chainId } = W3Wallet
  const account = accounts[0]

  const deploy = async () => {
    const contractAbi = [
      {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "internalType": "address",
            "name": "from",
            "type": "address"
          },
          {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "indexed": false,
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "inputs": [],
        "name": "DOMAIN_SEPARATOR",
        "outputs": [
          {
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          }
        ],
        "name": "allowance",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "burn",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "account",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "burnFrom",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "decimals",
        "outputs": [
          {
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "subtractedValue",
            "type": "uint256"
          }
        ],
        "name": "decreaseAllowance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "addedValue",
            "type": "uint256"
          }
        ],
        "name": "increaseAllowance",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          }
        ],
        "name": "nonces",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "owner",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "spender",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "deadline",
            "type": "uint256"
          },
          {
            "internalType": "uint8",
            "name": "v",
            "type": "uint8"
          },
          {
            "internalType": "bytes32",
            "name": "r",
            "type": "bytes32"
          },
          {
            "internalType": "bytes32",
            "name": "s",
            "type": "bytes32"
          }
        ],
        "name": "permit",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "address",
            "name": "sender",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "recipient",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          }
        ],
        "name": "transferFrom",
        "outputs": [
          {
            "internalType": "bool",
            "name": "",
            "type": "bool"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
    const contractByteCode = {
      "functionDebugData": {
        "@_1012": {
          "entryPoint": null,
          "id": 1012,
          "parameterSlots": 2,
          "returnSlots": 0
        },
        "@_1546": {
          "entryPoint": null,
          "id": 1546,
          "parameterSlots": 1,
          "returnSlots": 0
        },
        "@_1764": {
          "entryPoint": null,
          "id": 1764,
          "parameterSlots": 0,
          "returnSlots": 0
        },
        "@_742": {
          "entryPoint": null,
          "id": 742,
          "parameterSlots": 2,
          "returnSlots": 0
        },
        "@_afterTokenTransfer_1512": {
          "entryPoint": 1030,
          "id": 1512,
          "parameterSlots": 3,
          "returnSlots": 0
        },
        "@_beforeTokenTransfer_1501": {
          "entryPoint": 1025,
          "id": 1501,
          "parameterSlots": 3,
          "returnSlots": 0
        },
        "@_buildDomainSeparator_798": {
          "entryPoint": 579,
          "id": 798,
          "parameterSlots": 3,
          "returnSlots": 1
        },
        "@_mint_1373": {
          "entryPoint": 648,
          "id": 1373,
          "parameterSlots": 2,
          "returnSlots": 0
        },
        "@decimals_1042": {
          "entryPoint": 639,
          "id": 1042,
          "parameterSlots": 0,
          "returnSlots": 1
        },
        "abi_encode_t_address_to_t_address_fromStack": {
          "entryPoint": 1211,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 0
        },
        "abi_encode_t_bytes32_to_t_bytes32_fromStack": {
          "entryPoint": 1228,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 0
        },
        "abi_encode_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e_to_t_string_memory_ptr_fromStack": {
          "entryPoint": 1245,
          "id": null,
          "parameterSlots": 1,
          "returnSlots": 1
        },
        "abi_encode_t_uint256_to_t_uint256_fromStack": {
          "entryPoint": 1284,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 0
        },
        "abi_encode_tuple_t_bytes32_t_bytes32_t_bytes32_t_uint256_t_address__to_t_bytes32_t_bytes32_t_bytes32_t_uint256_t_address__fromStack_reversed": {
          "entryPoint": 1301,
          "id": null,
          "parameterSlots": 6,
          "returnSlots": 1
        },
        "abi_encode_tuple_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e__to_t_string_memory_ptr__fromStack_reversed": {
          "entryPoint": 1394,
          "id": null,
          "parameterSlots": 1,
          "returnSlots": 1
        },
        "abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed": {
          "entryPoint": 1428,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 1
        },
        "array_storeLengthForEncoding_t_string_memory_ptr_fromStack": {
          "entryPoint": 1457,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 1
        },
        "checked_add_t_uint256": {
          "entryPoint": 1474,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 1
        },
        "checked_exp_helper": {
          "entryPoint": 1567,
          "id": null,
          "parameterSlots": 4,
          "returnSlots": 2
        },
        "checked_exp_t_uint256_t_uint8": {
          "entryPoint": 1658,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 1
        },
        "checked_exp_unsigned": {
          "entryPoint": 1739,
          "id": null,
          "parameterSlots": 3,
          "returnSlots": 1
        },
        "checked_mul_t_uint256": {
          "entryPoint": 1975,
          "id": null,
          "parameterSlots": 2,
          "returnSlots": 1
        },
        "cleanup_t_address": {
          "entryPoint": 2072,
          "id": null,
          "parameterSlots": 1,
          "returnSlots": 1
        },
        "cleanup_t_bytes32": {
          "entryPoint": 2092,
          "id": null,
          "parameterSlots": 1,
          "returnSlots": 1
        },
        "cleanup_t_uint160": {
          "entryPoint": 2102,
          "id": null,
          "parameterSlots": 1,
          "returnSlots": 1
        },
        "cleanup_t_uint256": {
          "entryPoint": 2134,
          "id": null,
          "parameterSlots": 1,
          "returnSlots": 1
        },
        "cleanup_t_uint8": {
          "entryPoint": 2144,
          "id": null,
          "parameterSlots": 1,
          "returnSlots": 1
        },
        "extract_byte_array_length": {
          "entryPoint": 2157,
          "id": null,
          "parameterSlots": 1,
          "returnSlots": 1
        },
        "panic_error_0x11": {
          "entryPoint": 2211,
          "id": null,
          "parameterSlots": 0,
          "returnSlots": 0
        },
        "panic_error_0x22": {
          "entryPoint": 2258,
          "id": null,
          "parameterSlots": 0,
          "returnSlots": 0
        },
        "shift_right_1_unsigned": {
          "entryPoint": 2305,
          "id": null,
          "parameterSlots": 1,
          "returnSlots": 1
        },
        "store_literal_in_memory_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e": {
          "entryPoint": 2318,
          "id": null,
          "parameterSlots": 1,
          "returnSlots": 0
        }
      },
      "generatedSources": [
        {
          "ast": {
            "nodeType": "YulBlock",
            "src": "0:6616:1",
            "statements": [
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "72:53:1",
                  "statements": [
                    {
                      "expression": {
                        "arguments": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "89:3:1"
                          },
                          {
                            "arguments": [
                              {
                                "name": "value",
                                "nodeType": "YulIdentifier",
                                "src": "112:5:1"
                              }
                            ],
                            "functionName": {
                              "name": "cleanup_t_address",
                              "nodeType": "YulIdentifier",
                              "src": "94:17:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "94:24:1"
                          }
                        ],
                        "functionName": {
                          "name": "mstore",
                          "nodeType": "YulIdentifier",
                          "src": "82:6:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "82:37:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "82:37:1"
                    }
                  ]
                },
                "name": "abi_encode_t_address_to_t_address_fromStack",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "value",
                    "nodeType": "YulTypedName",
                    "src": "60:5:1",
                    "type": ""
                  },
                  {
                    "name": "pos",
                    "nodeType": "YulTypedName",
                    "src": "67:3:1",
                    "type": ""
                  }
                ],
                "src": "7:118:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "196:53:1",
                  "statements": [
                    {
                      "expression": {
                        "arguments": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "213:3:1"
                          },
                          {
                            "arguments": [
                              {
                                "name": "value",
                                "nodeType": "YulIdentifier",
                                "src": "236:5:1"
                              }
                            ],
                            "functionName": {
                              "name": "cleanup_t_bytes32",
                              "nodeType": "YulIdentifier",
                              "src": "218:17:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "218:24:1"
                          }
                        ],
                        "functionName": {
                          "name": "mstore",
                          "nodeType": "YulIdentifier",
                          "src": "206:6:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "206:37:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "206:37:1"
                    }
                  ]
                },
                "name": "abi_encode_t_bytes32_to_t_bytes32_fromStack",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "value",
                    "nodeType": "YulTypedName",
                    "src": "184:5:1",
                    "type": ""
                  },
                  {
                    "name": "pos",
                    "nodeType": "YulTypedName",
                    "src": "191:3:1",
                    "type": ""
                  }
                ],
                "src": "131:118:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "401:220:1",
                  "statements": [
                    {
                      "nodeType": "YulAssignment",
                      "src": "411:74:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "477:3:1"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "482:2:1",
                            "type": "",
                            "value": "31"
                          }
                        ],
                        "functionName": {
                          "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                          "nodeType": "YulIdentifier",
                          "src": "418:58:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "418:67:1"
                      },
                      "variableNames": [
                        {
                          "name": "pos",
                          "nodeType": "YulIdentifier",
                          "src": "411:3:1"
                        }
                      ]
                    },
                    {
                      "expression": {
                        "arguments": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "583:3:1"
                          }
                        ],
                        "functionName": {
                          "name": "store_literal_in_memory_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e",
                          "nodeType": "YulIdentifier",
                          "src": "494:88:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "494:93:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "494:93:1"
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "596:19:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "607:3:1"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "612:2:1",
                            "type": "",
                            "value": "32"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "603:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "603:12:1"
                      },
                      "variableNames": [
                        {
                          "name": "end",
                          "nodeType": "YulIdentifier",
                          "src": "596:3:1"
                        }
                      ]
                    }
                  ]
                },
                "name": "abi_encode_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e_to_t_string_memory_ptr_fromStack",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "pos",
                    "nodeType": "YulTypedName",
                    "src": "389:3:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "end",
                    "nodeType": "YulTypedName",
                    "src": "397:3:1",
                    "type": ""
                  }
                ],
                "src": "255:366:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "692:53:1",
                  "statements": [
                    {
                      "expression": {
                        "arguments": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "709:3:1"
                          },
                          {
                            "arguments": [
                              {
                                "name": "value",
                                "nodeType": "YulIdentifier",
                                "src": "732:5:1"
                              }
                            ],
                            "functionName": {
                              "name": "cleanup_t_uint256",
                              "nodeType": "YulIdentifier",
                              "src": "714:17:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "714:24:1"
                          }
                        ],
                        "functionName": {
                          "name": "mstore",
                          "nodeType": "YulIdentifier",
                          "src": "702:6:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "702:37:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "702:37:1"
                    }
                  ]
                },
                "name": "abi_encode_t_uint256_to_t_uint256_fromStack",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "value",
                    "nodeType": "YulTypedName",
                    "src": "680:5:1",
                    "type": ""
                  },
                  {
                    "name": "pos",
                    "nodeType": "YulTypedName",
                    "src": "687:3:1",
                    "type": ""
                  }
                ],
                "src": "627:118:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "961:454:1",
                  "statements": [
                    {
                      "nodeType": "YulAssignment",
                      "src": "971:27:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "983:9:1"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "994:3:1",
                            "type": "",
                            "value": "160"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "979:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "979:19:1"
                      },
                      "variableNames": [
                        {
                          "name": "tail",
                          "nodeType": "YulIdentifier",
                          "src": "971:4:1"
                        }
                      ]
                    },
                    {
                      "expression": {
                        "arguments": [
                          {
                            "name": "value0",
                            "nodeType": "YulIdentifier",
                            "src": "1052:6:1"
                          },
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "1065:9:1"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "1076:1:1",
                                "type": "",
                                "value": "0"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "1061:3:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "1061:17:1"
                          }
                        ],
                        "functionName": {
                          "name": "abi_encode_t_bytes32_to_t_bytes32_fromStack",
                          "nodeType": "YulIdentifier",
                          "src": "1008:43:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1008:71:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "1008:71:1"
                    },
                    {
                      "expression": {
                        "arguments": [
                          {
                            "name": "value1",
                            "nodeType": "YulIdentifier",
                            "src": "1133:6:1"
                          },
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "1146:9:1"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "1157:2:1",
                                "type": "",
                                "value": "32"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "1142:3:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "1142:18:1"
                          }
                        ],
                        "functionName": {
                          "name": "abi_encode_t_bytes32_to_t_bytes32_fromStack",
                          "nodeType": "YulIdentifier",
                          "src": "1089:43:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1089:72:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "1089:72:1"
                    },
                    {
                      "expression": {
                        "arguments": [
                          {
                            "name": "value2",
                            "nodeType": "YulIdentifier",
                            "src": "1215:6:1"
                          },
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "1228:9:1"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "1239:2:1",
                                "type": "",
                                "value": "64"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "1224:3:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "1224:18:1"
                          }
                        ],
                        "functionName": {
                          "name": "abi_encode_t_bytes32_to_t_bytes32_fromStack",
                          "nodeType": "YulIdentifier",
                          "src": "1171:43:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1171:72:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "1171:72:1"
                    },
                    {
                      "expression": {
                        "arguments": [
                          {
                            "name": "value3",
                            "nodeType": "YulIdentifier",
                            "src": "1297:6:1"
                          },
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "1310:9:1"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "1321:2:1",
                                "type": "",
                                "value": "96"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "1306:3:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "1306:18:1"
                          }
                        ],
                        "functionName": {
                          "name": "abi_encode_t_uint256_to_t_uint256_fromStack",
                          "nodeType": "YulIdentifier",
                          "src": "1253:43:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1253:72:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "1253:72:1"
                    },
                    {
                      "expression": {
                        "arguments": [
                          {
                            "name": "value4",
                            "nodeType": "YulIdentifier",
                            "src": "1379:6:1"
                          },
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "1392:9:1"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "1403:3:1",
                                "type": "",
                                "value": "128"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "1388:3:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "1388:19:1"
                          }
                        ],
                        "functionName": {
                          "name": "abi_encode_t_address_to_t_address_fromStack",
                          "nodeType": "YulIdentifier",
                          "src": "1335:43:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1335:73:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "1335:73:1"
                    }
                  ]
                },
                "name": "abi_encode_tuple_t_bytes32_t_bytes32_t_bytes32_t_uint256_t_address__to_t_bytes32_t_bytes32_t_bytes32_t_uint256_t_address__fromStack_reversed",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "headStart",
                    "nodeType": "YulTypedName",
                    "src": "901:9:1",
                    "type": ""
                  },
                  {
                    "name": "value4",
                    "nodeType": "YulTypedName",
                    "src": "913:6:1",
                    "type": ""
                  },
                  {
                    "name": "value3",
                    "nodeType": "YulTypedName",
                    "src": "921:6:1",
                    "type": ""
                  },
                  {
                    "name": "value2",
                    "nodeType": "YulTypedName",
                    "src": "929:6:1",
                    "type": ""
                  },
                  {
                    "name": "value1",
                    "nodeType": "YulTypedName",
                    "src": "937:6:1",
                    "type": ""
                  },
                  {
                    "name": "value0",
                    "nodeType": "YulTypedName",
                    "src": "945:6:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "tail",
                    "nodeType": "YulTypedName",
                    "src": "956:4:1",
                    "type": ""
                  }
                ],
                "src": "751:664:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "1592:248:1",
                  "statements": [
                    {
                      "nodeType": "YulAssignment",
                      "src": "1602:26:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "1614:9:1"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "1625:2:1",
                            "type": "",
                            "value": "32"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "1610:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1610:18:1"
                      },
                      "variableNames": [
                        {
                          "name": "tail",
                          "nodeType": "YulIdentifier",
                          "src": "1602:4:1"
                        }
                      ]
                    },
                    {
                      "expression": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "1649:9:1"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "1660:1:1",
                                "type": "",
                                "value": "0"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "1645:3:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "1645:17:1"
                          },
                          {
                            "arguments": [
                              {
                                "name": "tail",
                                "nodeType": "YulIdentifier",
                                "src": "1668:4:1"
                              },
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "1674:9:1"
                              }
                            ],
                            "functionName": {
                              "name": "sub",
                              "nodeType": "YulIdentifier",
                              "src": "1664:3:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "1664:20:1"
                          }
                        ],
                        "functionName": {
                          "name": "mstore",
                          "nodeType": "YulIdentifier",
                          "src": "1638:6:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1638:47:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "1638:47:1"
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "1694:139:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "tail",
                            "nodeType": "YulIdentifier",
                            "src": "1828:4:1"
                          }
                        ],
                        "functionName": {
                          "name": "abi_encode_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e_to_t_string_memory_ptr_fromStack",
                          "nodeType": "YulIdentifier",
                          "src": "1702:124:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1702:131:1"
                      },
                      "variableNames": [
                        {
                          "name": "tail",
                          "nodeType": "YulIdentifier",
                          "src": "1694:4:1"
                        }
                      ]
                    }
                  ]
                },
                "name": "abi_encode_tuple_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e__to_t_string_memory_ptr__fromStack_reversed",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "headStart",
                    "nodeType": "YulTypedName",
                    "src": "1572:9:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "tail",
                    "nodeType": "YulTypedName",
                    "src": "1587:4:1",
                    "type": ""
                  }
                ],
                "src": "1421:419:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "1944:124:1",
                  "statements": [
                    {
                      "nodeType": "YulAssignment",
                      "src": "1954:26:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "headStart",
                            "nodeType": "YulIdentifier",
                            "src": "1966:9:1"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "1977:2:1",
                            "type": "",
                            "value": "32"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "1962:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1962:18:1"
                      },
                      "variableNames": [
                        {
                          "name": "tail",
                          "nodeType": "YulIdentifier",
                          "src": "1954:4:1"
                        }
                      ]
                    },
                    {
                      "expression": {
                        "arguments": [
                          {
                            "name": "value0",
                            "nodeType": "YulIdentifier",
                            "src": "2034:6:1"
                          },
                          {
                            "arguments": [
                              {
                                "name": "headStart",
                                "nodeType": "YulIdentifier",
                                "src": "2047:9:1"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "2058:1:1",
                                "type": "",
                                "value": "0"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "2043:3:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "2043:17:1"
                          }
                        ],
                        "functionName": {
                          "name": "abi_encode_t_uint256_to_t_uint256_fromStack",
                          "nodeType": "YulIdentifier",
                          "src": "1990:43:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "1990:71:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "1990:71:1"
                    }
                  ]
                },
                "name": "abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "headStart",
                    "nodeType": "YulTypedName",
                    "src": "1916:9:1",
                    "type": ""
                  },
                  {
                    "name": "value0",
                    "nodeType": "YulTypedName",
                    "src": "1928:6:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "tail",
                    "nodeType": "YulTypedName",
                    "src": "1939:4:1",
                    "type": ""
                  }
                ],
                "src": "1846:222:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "2170:73:1",
                  "statements": [
                    {
                      "expression": {
                        "arguments": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "2187:3:1"
                          },
                          {
                            "name": "length",
                            "nodeType": "YulIdentifier",
                            "src": "2192:6:1"
                          }
                        ],
                        "functionName": {
                          "name": "mstore",
                          "nodeType": "YulIdentifier",
                          "src": "2180:6:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "2180:19:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "2180:19:1"
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "2208:29:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "pos",
                            "nodeType": "YulIdentifier",
                            "src": "2227:3:1"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "2232:4:1",
                            "type": "",
                            "value": "0x20"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "2223:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "2223:14:1"
                      },
                      "variableNames": [
                        {
                          "name": "updated_pos",
                          "nodeType": "YulIdentifier",
                          "src": "2208:11:1"
                        }
                      ]
                    }
                  ]
                },
                "name": "array_storeLengthForEncoding_t_string_memory_ptr_fromStack",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "pos",
                    "nodeType": "YulTypedName",
                    "src": "2142:3:1",
                    "type": ""
                  },
                  {
                    "name": "length",
                    "nodeType": "YulTypedName",
                    "src": "2147:6:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "updated_pos",
                    "nodeType": "YulTypedName",
                    "src": "2158:11:1",
                    "type": ""
                  }
                ],
                "src": "2074:169:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "2293:261:1",
                  "statements": [
                    {
                      "nodeType": "YulAssignment",
                      "src": "2303:25:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "x",
                            "nodeType": "YulIdentifier",
                            "src": "2326:1:1"
                          }
                        ],
                        "functionName": {
                          "name": "cleanup_t_uint256",
                          "nodeType": "YulIdentifier",
                          "src": "2308:17:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "2308:20:1"
                      },
                      "variableNames": [
                        {
                          "name": "x",
                          "nodeType": "YulIdentifier",
                          "src": "2303:1:1"
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "2337:25:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "y",
                            "nodeType": "YulIdentifier",
                            "src": "2360:1:1"
                          }
                        ],
                        "functionName": {
                          "name": "cleanup_t_uint256",
                          "nodeType": "YulIdentifier",
                          "src": "2342:17:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "2342:20:1"
                      },
                      "variableNames": [
                        {
                          "name": "y",
                          "nodeType": "YulIdentifier",
                          "src": "2337:1:1"
                        }
                      ]
                    },
                    {
                      "body": {
                        "nodeType": "YulBlock",
                        "src": "2500:22:1",
                        "statements": [
                          {
                            "expression": {
                              "arguments": [],
                              "functionName": {
                                "name": "panic_error_0x11",
                                "nodeType": "YulIdentifier",
                                "src": "2502:16:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "2502:18:1"
                            },
                            "nodeType": "YulExpressionStatement",
                            "src": "2502:18:1"
                          }
                        ]
                      },
                      "condition": {
                        "arguments": [
                          {
                            "name": "x",
                            "nodeType": "YulIdentifier",
                            "src": "2421:1:1"
                          },
                          {
                            "arguments": [
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "2428:66:1",
                                "type": "",
                                "value": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                              },
                              {
                                "name": "y",
                                "nodeType": "YulIdentifier",
                                "src": "2496:1:1"
                              }
                            ],
                            "functionName": {
                              "name": "sub",
                              "nodeType": "YulIdentifier",
                              "src": "2424:3:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "2424:74:1"
                          }
                        ],
                        "functionName": {
                          "name": "gt",
                          "nodeType": "YulIdentifier",
                          "src": "2418:2:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "2418:81:1"
                      },
                      "nodeType": "YulIf",
                      "src": "2415:107:1"
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "2532:16:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "x",
                            "nodeType": "YulIdentifier",
                            "src": "2543:1:1"
                          },
                          {
                            "name": "y",
                            "nodeType": "YulIdentifier",
                            "src": "2546:1:1"
                          }
                        ],
                        "functionName": {
                          "name": "add",
                          "nodeType": "YulIdentifier",
                          "src": "2539:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "2539:9:1"
                      },
                      "variableNames": [
                        {
                          "name": "sum",
                          "nodeType": "YulIdentifier",
                          "src": "2532:3:1"
                        }
                      ]
                    }
                  ]
                },
                "name": "checked_add_t_uint256",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "x",
                    "nodeType": "YulTypedName",
                    "src": "2280:1:1",
                    "type": ""
                  },
                  {
                    "name": "y",
                    "nodeType": "YulTypedName",
                    "src": "2283:1:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "sum",
                    "nodeType": "YulTypedName",
                    "src": "2289:3:1",
                    "type": ""
                  }
                ],
                "src": "2249:305:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "2633:775:1",
                  "statements": [
                    {
                      "nodeType": "YulAssignment",
                      "src": "2643:15:1",
                      "value": {
                        "name": "_power",
                        "nodeType": "YulIdentifier",
                        "src": "2652:6:1"
                      },
                      "variableNames": [
                        {
                          "name": "power",
                          "nodeType": "YulIdentifier",
                          "src": "2643:5:1"
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "2667:14:1",
                      "value": {
                        "name": "_base",
                        "nodeType": "YulIdentifier",
                        "src": "2676:5:1"
                      },
                      "variableNames": [
                        {
                          "name": "base",
                          "nodeType": "YulIdentifier",
                          "src": "2667:4:1"
                        }
                      ]
                    },
                    {
                      "body": {
                        "nodeType": "YulBlock",
                        "src": "2725:677:1",
                        "statements": [
                          {
                            "body": {
                              "nodeType": "YulBlock",
                              "src": "2813:22:1",
                              "statements": [
                                {
                                  "expression": {
                                    "arguments": [],
                                    "functionName": {
                                      "name": "panic_error_0x11",
                                      "nodeType": "YulIdentifier",
                                      "src": "2815:16:1"
                                    },
                                    "nodeType": "YulFunctionCall",
                                    "src": "2815:18:1"
                                  },
                                  "nodeType": "YulExpressionStatement",
                                  "src": "2815:18:1"
                                }
                              ]
                            },
                            "condition": {
                              "arguments": [
                                {
                                  "name": "base",
                                  "nodeType": "YulIdentifier",
                                  "src": "2791:4:1"
                                },
                                {
                                  "arguments": [
                                    {
                                      "name": "max",
                                      "nodeType": "YulIdentifier",
                                      "src": "2801:3:1"
                                    },
                                    {
                                      "name": "base",
                                      "nodeType": "YulIdentifier",
                                      "src": "2806:4:1"
                                    }
                                  ],
                                  "functionName": {
                                    "name": "div",
                                    "nodeType": "YulIdentifier",
                                    "src": "2797:3:1"
                                  },
                                  "nodeType": "YulFunctionCall",
                                  "src": "2797:14:1"
                                }
                              ],
                              "functionName": {
                                "name": "gt",
                                "nodeType": "YulIdentifier",
                                "src": "2788:2:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "2788:24:1"
                            },
                            "nodeType": "YulIf",
                            "src": "2785:50:1"
                          },
                          {
                            "body": {
                              "nodeType": "YulBlock",
                              "src": "2880:419:1",
                              "statements": [
                                {
                                  "nodeType": "YulAssignment",
                                  "src": "3260:25:1",
                                  "value": {
                                    "arguments": [
                                      {
                                        "name": "power",
                                        "nodeType": "YulIdentifier",
                                        "src": "3273:5:1"
                                      },
                                      {
                                        "name": "base",
                                        "nodeType": "YulIdentifier",
                                        "src": "3280:4:1"
                                      }
                                    ],
                                    "functionName": {
                                      "name": "mul",
                                      "nodeType": "YulIdentifier",
                                      "src": "3269:3:1"
                                    },
                                    "nodeType": "YulFunctionCall",
                                    "src": "3269:16:1"
                                  },
                                  "variableNames": [
                                    {
                                      "name": "power",
                                      "nodeType": "YulIdentifier",
                                      "src": "3260:5:1"
                                    }
                                  ]
                                }
                              ]
                            },
                            "condition": {
                              "arguments": [
                                {
                                  "name": "exponent",
                                  "nodeType": "YulIdentifier",
                                  "src": "2855:8:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "2865:1:1",
                                  "type": "",
                                  "value": "1"
                                }
                              ],
                              "functionName": {
                                "name": "and",
                                "nodeType": "YulIdentifier",
                                "src": "2851:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "2851:16:1"
                            },
                            "nodeType": "YulIf",
                            "src": "2848:451:1"
                          },
                          {
                            "nodeType": "YulAssignment",
                            "src": "3312:23:1",
                            "value": {
                              "arguments": [
                                {
                                  "name": "base",
                                  "nodeType": "YulIdentifier",
                                  "src": "3324:4:1"
                                },
                                {
                                  "name": "base",
                                  "nodeType": "YulIdentifier",
                                  "src": "3330:4:1"
                                }
                              ],
                              "functionName": {
                                "name": "mul",
                                "nodeType": "YulIdentifier",
                                "src": "3320:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "3320:15:1"
                            },
                            "variableNames": [
                              {
                                "name": "base",
                                "nodeType": "YulIdentifier",
                                "src": "3312:4:1"
                              }
                            ]
                          },
                          {
                            "nodeType": "YulAssignment",
                            "src": "3348:44:1",
                            "value": {
                              "arguments": [
                                {
                                  "name": "exponent",
                                  "nodeType": "YulIdentifier",
                                  "src": "3383:8:1"
                                }
                              ],
                              "functionName": {
                                "name": "shift_right_1_unsigned",
                                "nodeType": "YulIdentifier",
                                "src": "3360:22:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "3360:32:1"
                            },
                            "variableNames": [
                              {
                                "name": "exponent",
                                "nodeType": "YulIdentifier",
                                "src": "3348:8:1"
                              }
                            ]
                          }
                        ]
                      },
                      "condition": {
                        "arguments": [
                          {
                            "name": "exponent",
                            "nodeType": "YulIdentifier",
                            "src": "2701:8:1"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "2711:1:1",
                            "type": "",
                            "value": "1"
                          }
                        ],
                        "functionName": {
                          "name": "gt",
                          "nodeType": "YulIdentifier",
                          "src": "2698:2:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "2698:15:1"
                      },
                      "nodeType": "YulForLoop",
                      "post": {
                        "nodeType": "YulBlock",
                        "src": "2714:2:1",
                        "statements": []
                      },
                      "pre": {
                        "nodeType": "YulBlock",
                        "src": "2694:3:1",
                        "statements": []
                      },
                      "src": "2690:712:1"
                    }
                  ]
                },
                "name": "checked_exp_helper",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "_power",
                    "nodeType": "YulTypedName",
                    "src": "2588:6:1",
                    "type": ""
                  },
                  {
                    "name": "_base",
                    "nodeType": "YulTypedName",
                    "src": "2596:5:1",
                    "type": ""
                  },
                  {
                    "name": "exponent",
                    "nodeType": "YulTypedName",
                    "src": "2603:8:1",
                    "type": ""
                  },
                  {
                    "name": "max",
                    "nodeType": "YulTypedName",
                    "src": "2613:3:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "power",
                    "nodeType": "YulTypedName",
                    "src": "2621:5:1",
                    "type": ""
                  },
                  {
                    "name": "base",
                    "nodeType": "YulTypedName",
                    "src": "2628:4:1",
                    "type": ""
                  }
                ],
                "src": "2560:848:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "3478:217:1",
                  "statements": [
                    {
                      "nodeType": "YulAssignment",
                      "src": "3488:31:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "base",
                            "nodeType": "YulIdentifier",
                            "src": "3514:4:1"
                          }
                        ],
                        "functionName": {
                          "name": "cleanup_t_uint256",
                          "nodeType": "YulIdentifier",
                          "src": "3496:17:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "3496:23:1"
                      },
                      "variableNames": [
                        {
                          "name": "base",
                          "nodeType": "YulIdentifier",
                          "src": "3488:4:1"
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "3528:37:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "exponent",
                            "nodeType": "YulIdentifier",
                            "src": "3556:8:1"
                          }
                        ],
                        "functionName": {
                          "name": "cleanup_t_uint8",
                          "nodeType": "YulIdentifier",
                          "src": "3540:15:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "3540:25:1"
                      },
                      "variableNames": [
                        {
                          "name": "exponent",
                          "nodeType": "YulIdentifier",
                          "src": "3528:8:1"
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "3575:113:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "base",
                            "nodeType": "YulIdentifier",
                            "src": "3605:4:1"
                          },
                          {
                            "name": "exponent",
                            "nodeType": "YulIdentifier",
                            "src": "3611:8:1"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "3621:66:1",
                            "type": "",
                            "value": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                          }
                        ],
                        "functionName": {
                          "name": "checked_exp_unsigned",
                          "nodeType": "YulIdentifier",
                          "src": "3584:20:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "3584:104:1"
                      },
                      "variableNames": [
                        {
                          "name": "power",
                          "nodeType": "YulIdentifier",
                          "src": "3575:5:1"
                        }
                      ]
                    }
                  ]
                },
                "name": "checked_exp_t_uint256_t_uint8",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "base",
                    "nodeType": "YulTypedName",
                    "src": "3453:4:1",
                    "type": ""
                  },
                  {
                    "name": "exponent",
                    "nodeType": "YulTypedName",
                    "src": "3459:8:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "power",
                    "nodeType": "YulTypedName",
                    "src": "3472:5:1",
                    "type": ""
                  }
                ],
                "src": "3414:281:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "3761:1013:1",
                  "statements": [
                    {
                      "body": {
                        "nodeType": "YulBlock",
                        "src": "3956:20:1",
                        "statements": [
                          {
                            "nodeType": "YulAssignment",
                            "src": "3958:10:1",
                            "value": {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "3967:1:1",
                              "type": "",
                              "value": "1"
                            },
                            "variableNames": [
                              {
                                "name": "power",
                                "nodeType": "YulIdentifier",
                                "src": "3958:5:1"
                              }
                            ]
                          },
                          {
                            "nodeType": "YulLeave",
                            "src": "3969:5:1"
                          }
                        ]
                      },
                      "condition": {
                        "arguments": [
                          {
                            "name": "exponent",
                            "nodeType": "YulIdentifier",
                            "src": "3946:8:1"
                          }
                        ],
                        "functionName": {
                          "name": "iszero",
                          "nodeType": "YulIdentifier",
                          "src": "3939:6:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "3939:16:1"
                      },
                      "nodeType": "YulIf",
                      "src": "3936:40:1"
                    },
                    {
                      "body": {
                        "nodeType": "YulBlock",
                        "src": "4001:20:1",
                        "statements": [
                          {
                            "nodeType": "YulAssignment",
                            "src": "4003:10:1",
                            "value": {
                              "kind": "number",
                              "nodeType": "YulLiteral",
                              "src": "4012:1:1",
                              "type": "",
                              "value": "0"
                            },
                            "variableNames": [
                              {
                                "name": "power",
                                "nodeType": "YulIdentifier",
                                "src": "4003:5:1"
                              }
                            ]
                          },
                          {
                            "nodeType": "YulLeave",
                            "src": "4014:5:1"
                          }
                        ]
                      },
                      "condition": {
                        "arguments": [
                          {
                            "name": "base",
                            "nodeType": "YulIdentifier",
                            "src": "3995:4:1"
                          }
                        ],
                        "functionName": {
                          "name": "iszero",
                          "nodeType": "YulIdentifier",
                          "src": "3988:6:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "3988:12:1"
                      },
                      "nodeType": "YulIf",
                      "src": "3985:36:1"
                    },
                    {
                      "cases": [
                        {
                          "body": {
                            "nodeType": "YulBlock",
                            "src": "4131:20:1",
                            "statements": [
                              {
                                "nodeType": "YulAssignment",
                                "src": "4133:10:1",
                                "value": {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "4142:1:1",
                                  "type": "",
                                  "value": "1"
                                },
                                "variableNames": [
                                  {
                                    "name": "power",
                                    "nodeType": "YulIdentifier",
                                    "src": "4133:5:1"
                                  }
                                ]
                              },
                              {
                                "nodeType": "YulLeave",
                                "src": "4144:5:1"
                              }
                            ]
                          },
                          "nodeType": "YulCase",
                          "src": "4124:27:1",
                          "value": {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "4129:1:1",
                            "type": "",
                            "value": "1"
                          }
                        },
                        {
                          "body": {
                            "nodeType": "YulBlock",
                            "src": "4175:176:1",
                            "statements": [
                              {
                                "body": {
                                  "nodeType": "YulBlock",
                                  "src": "4210:22:1",
                                  "statements": [
                                    {
                                      "expression": {
                                        "arguments": [],
                                        "functionName": {
                                          "name": "panic_error_0x11",
                                          "nodeType": "YulIdentifier",
                                          "src": "4212:16:1"
                                        },
                                        "nodeType": "YulFunctionCall",
                                        "src": "4212:18:1"
                                      },
                                      "nodeType": "YulExpressionStatement",
                                      "src": "4212:18:1"
                                    }
                                  ]
                                },
                                "condition": {
                                  "arguments": [
                                    {
                                      "name": "exponent",
                                      "nodeType": "YulIdentifier",
                                      "src": "4195:8:1"
                                    },
                                    {
                                      "kind": "number",
                                      "nodeType": "YulLiteral",
                                      "src": "4205:3:1",
                                      "type": "",
                                      "value": "255"
                                    }
                                  ],
                                  "functionName": {
                                    "name": "gt",
                                    "nodeType": "YulIdentifier",
                                    "src": "4192:2:1"
                                  },
                                  "nodeType": "YulFunctionCall",
                                  "src": "4192:17:1"
                                },
                                "nodeType": "YulIf",
                                "src": "4189:43:1"
                              },
                              {
                                "nodeType": "YulAssignment",
                                "src": "4245:25:1",
                                "value": {
                                  "arguments": [
                                    {
                                      "kind": "number",
                                      "nodeType": "YulLiteral",
                                      "src": "4258:1:1",
                                      "type": "",
                                      "value": "2"
                                    },
                                    {
                                      "name": "exponent",
                                      "nodeType": "YulIdentifier",
                                      "src": "4261:8:1"
                                    }
                                  ],
                                  "functionName": {
                                    "name": "exp",
                                    "nodeType": "YulIdentifier",
                                    "src": "4254:3:1"
                                  },
                                  "nodeType": "YulFunctionCall",
                                  "src": "4254:16:1"
                                },
                                "variableNames": [
                                  {
                                    "name": "power",
                                    "nodeType": "YulIdentifier",
                                    "src": "4245:5:1"
                                  }
                                ]
                              },
                              {
                                "body": {
                                  "nodeType": "YulBlock",
                                  "src": "4301:22:1",
                                  "statements": [
                                    {
                                      "expression": {
                                        "arguments": [],
                                        "functionName": {
                                          "name": "panic_error_0x11",
                                          "nodeType": "YulIdentifier",
                                          "src": "4303:16:1"
                                        },
                                        "nodeType": "YulFunctionCall",
                                        "src": "4303:18:1"
                                      },
                                      "nodeType": "YulExpressionStatement",
                                      "src": "4303:18:1"
                                    }
                                  ]
                                },
                                "condition": {
                                  "arguments": [
                                    {
                                      "name": "power",
                                      "nodeType": "YulIdentifier",
                                      "src": "4289:5:1"
                                    },
                                    {
                                      "name": "max",
                                      "nodeType": "YulIdentifier",
                                      "src": "4296:3:1"
                                    }
                                  ],
                                  "functionName": {
                                    "name": "gt",
                                    "nodeType": "YulIdentifier",
                                    "src": "4286:2:1"
                                  },
                                  "nodeType": "YulFunctionCall",
                                  "src": "4286:14:1"
                                },
                                "nodeType": "YulIf",
                                "src": "4283:40:1"
                              },
                              {
                                "nodeType": "YulLeave",
                                "src": "4336:5:1"
                              }
                            ]
                          },
                          "nodeType": "YulCase",
                          "src": "4160:191:1",
                          "value": {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "4165:1:1",
                            "type": "",
                            "value": "2"
                          }
                        }
                      ],
                      "expression": {
                        "name": "base",
                        "nodeType": "YulIdentifier",
                        "src": "4081:4:1"
                      },
                      "nodeType": "YulSwitch",
                      "src": "4074:277:1"
                    },
                    {
                      "body": {
                        "nodeType": "YulBlock",
                        "src": "4483:123:1",
                        "statements": [
                          {
                            "nodeType": "YulAssignment",
                            "src": "4497:28:1",
                            "value": {
                              "arguments": [
                                {
                                  "name": "base",
                                  "nodeType": "YulIdentifier",
                                  "src": "4510:4:1"
                                },
                                {
                                  "name": "exponent",
                                  "nodeType": "YulIdentifier",
                                  "src": "4516:8:1"
                                }
                              ],
                              "functionName": {
                                "name": "exp",
                                "nodeType": "YulIdentifier",
                                "src": "4506:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "4506:19:1"
                            },
                            "variableNames": [
                              {
                                "name": "power",
                                "nodeType": "YulIdentifier",
                                "src": "4497:5:1"
                              }
                            ]
                          },
                          {
                            "body": {
                              "nodeType": "YulBlock",
                              "src": "4556:22:1",
                              "statements": [
                                {
                                  "expression": {
                                    "arguments": [],
                                    "functionName": {
                                      "name": "panic_error_0x11",
                                      "nodeType": "YulIdentifier",
                                      "src": "4558:16:1"
                                    },
                                    "nodeType": "YulFunctionCall",
                                    "src": "4558:18:1"
                                  },
                                  "nodeType": "YulExpressionStatement",
                                  "src": "4558:18:1"
                                }
                              ]
                            },
                            "condition": {
                              "arguments": [
                                {
                                  "name": "power",
                                  "nodeType": "YulIdentifier",
                                  "src": "4544:5:1"
                                },
                                {
                                  "name": "max",
                                  "nodeType": "YulIdentifier",
                                  "src": "4551:3:1"
                                }
                              ],
                              "functionName": {
                                "name": "gt",
                                "nodeType": "YulIdentifier",
                                "src": "4541:2:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "4541:14:1"
                            },
                            "nodeType": "YulIf",
                            "src": "4538:40:1"
                          },
                          {
                            "nodeType": "YulLeave",
                            "src": "4591:5:1"
                          }
                        ]
                      },
                      "condition": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "arguments": [
                                  {
                                    "name": "base",
                                    "nodeType": "YulIdentifier",
                                    "src": "4386:4:1"
                                  },
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "4392:2:1",
                                    "type": "",
                                    "value": "11"
                                  }
                                ],
                                "functionName": {
                                  "name": "lt",
                                  "nodeType": "YulIdentifier",
                                  "src": "4383:2:1"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "4383:12:1"
                              },
                              {
                                "arguments": [
                                  {
                                    "name": "exponent",
                                    "nodeType": "YulIdentifier",
                                    "src": "4400:8:1"
                                  },
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "4410:2:1",
                                    "type": "",
                                    "value": "78"
                                  }
                                ],
                                "functionName": {
                                  "name": "lt",
                                  "nodeType": "YulIdentifier",
                                  "src": "4397:2:1"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "4397:16:1"
                              }
                            ],
                            "functionName": {
                              "name": "and",
                              "nodeType": "YulIdentifier",
                              "src": "4379:3:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "4379:35:1"
                          },
                          {
                            "arguments": [
                              {
                                "arguments": [
                                  {
                                    "name": "base",
                                    "nodeType": "YulIdentifier",
                                    "src": "4435:4:1"
                                  },
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "4441:3:1",
                                    "type": "",
                                    "value": "307"
                                  }
                                ],
                                "functionName": {
                                  "name": "lt",
                                  "nodeType": "YulIdentifier",
                                  "src": "4432:2:1"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "4432:13:1"
                              },
                              {
                                "arguments": [
                                  {
                                    "name": "exponent",
                                    "nodeType": "YulIdentifier",
                                    "src": "4450:8:1"
                                  },
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "4460:2:1",
                                    "type": "",
                                    "value": "32"
                                  }
                                ],
                                "functionName": {
                                  "name": "lt",
                                  "nodeType": "YulIdentifier",
                                  "src": "4447:2:1"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "4447:16:1"
                              }
                            ],
                            "functionName": {
                              "name": "and",
                              "nodeType": "YulIdentifier",
                              "src": "4428:3:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "4428:36:1"
                          }
                        ],
                        "functionName": {
                          "name": "or",
                          "nodeType": "YulIdentifier",
                          "src": "4363:2:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "4363:111:1"
                      },
                      "nodeType": "YulIf",
                      "src": "4360:246:1"
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "4616:57:1",
                      "value": {
                        "arguments": [
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "4650:1:1",
                            "type": "",
                            "value": "1"
                          },
                          {
                            "name": "base",
                            "nodeType": "YulIdentifier",
                            "src": "4653:4:1"
                          },
                          {
                            "name": "exponent",
                            "nodeType": "YulIdentifier",
                            "src": "4659:8:1"
                          },
                          {
                            "name": "max",
                            "nodeType": "YulIdentifier",
                            "src": "4669:3:1"
                          }
                        ],
                        "functionName": {
                          "name": "checked_exp_helper",
                          "nodeType": "YulIdentifier",
                          "src": "4631:18:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "4631:42:1"
                      },
                      "variableNames": [
                        {
                          "name": "power",
                          "nodeType": "YulIdentifier",
                          "src": "4616:5:1"
                        },
                        {
                          "name": "base",
                          "nodeType": "YulIdentifier",
                          "src": "4623:4:1"
                        }
                      ]
                    },
                    {
                      "body": {
                        "nodeType": "YulBlock",
                        "src": "4712:22:1",
                        "statements": [
                          {
                            "expression": {
                              "arguments": [],
                              "functionName": {
                                "name": "panic_error_0x11",
                                "nodeType": "YulIdentifier",
                                "src": "4714:16:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "4714:18:1"
                            },
                            "nodeType": "YulExpressionStatement",
                            "src": "4714:18:1"
                          }
                        ]
                      },
                      "condition": {
                        "arguments": [
                          {
                            "name": "power",
                            "nodeType": "YulIdentifier",
                            "src": "4689:5:1"
                          },
                          {
                            "arguments": [
                              {
                                "name": "max",
                                "nodeType": "YulIdentifier",
                                "src": "4700:3:1"
                              },
                              {
                                "name": "base",
                                "nodeType": "YulIdentifier",
                                "src": "4705:4:1"
                              }
                            ],
                            "functionName": {
                              "name": "div",
                              "nodeType": "YulIdentifier",
                              "src": "4696:3:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "4696:14:1"
                          }
                        ],
                        "functionName": {
                          "name": "gt",
                          "nodeType": "YulIdentifier",
                          "src": "4686:2:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "4686:25:1"
                      },
                      "nodeType": "YulIf",
                      "src": "4683:51:1"
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "4743:25:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "power",
                            "nodeType": "YulIdentifier",
                            "src": "4756:5:1"
                          },
                          {
                            "name": "base",
                            "nodeType": "YulIdentifier",
                            "src": "4763:4:1"
                          }
                        ],
                        "functionName": {
                          "name": "mul",
                          "nodeType": "YulIdentifier",
                          "src": "4752:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "4752:16:1"
                      },
                      "variableNames": [
                        {
                          "name": "power",
                          "nodeType": "YulIdentifier",
                          "src": "4743:5:1"
                        }
                      ]
                    }
                  ]
                },
                "name": "checked_exp_unsigned",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "base",
                    "nodeType": "YulTypedName",
                    "src": "3731:4:1",
                    "type": ""
                  },
                  {
                    "name": "exponent",
                    "nodeType": "YulTypedName",
                    "src": "3737:8:1",
                    "type": ""
                  },
                  {
                    "name": "max",
                    "nodeType": "YulTypedName",
                    "src": "3747:3:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "power",
                    "nodeType": "YulTypedName",
                    "src": "3755:5:1",
                    "type": ""
                  }
                ],
                "src": "3701:1073:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "4828:300:1",
                  "statements": [
                    {
                      "nodeType": "YulAssignment",
                      "src": "4838:25:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "x",
                            "nodeType": "YulIdentifier",
                            "src": "4861:1:1"
                          }
                        ],
                        "functionName": {
                          "name": "cleanup_t_uint256",
                          "nodeType": "YulIdentifier",
                          "src": "4843:17:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "4843:20:1"
                      },
                      "variableNames": [
                        {
                          "name": "x",
                          "nodeType": "YulIdentifier",
                          "src": "4838:1:1"
                        }
                      ]
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "4872:25:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "y",
                            "nodeType": "YulIdentifier",
                            "src": "4895:1:1"
                          }
                        ],
                        "functionName": {
                          "name": "cleanup_t_uint256",
                          "nodeType": "YulIdentifier",
                          "src": "4877:17:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "4877:20:1"
                      },
                      "variableNames": [
                        {
                          "name": "y",
                          "nodeType": "YulIdentifier",
                          "src": "4872:1:1"
                        }
                      ]
                    },
                    {
                      "body": {
                        "nodeType": "YulBlock",
                        "src": "5070:22:1",
                        "statements": [
                          {
                            "expression": {
                              "arguments": [],
                              "functionName": {
                                "name": "panic_error_0x11",
                                "nodeType": "YulIdentifier",
                                "src": "5072:16:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "5072:18:1"
                            },
                            "nodeType": "YulExpressionStatement",
                            "src": "5072:18:1"
                          }
                        ]
                      },
                      "condition": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "arguments": [
                                  {
                                    "name": "x",
                                    "nodeType": "YulIdentifier",
                                    "src": "4982:1:1"
                                  }
                                ],
                                "functionName": {
                                  "name": "iszero",
                                  "nodeType": "YulIdentifier",
                                  "src": "4975:6:1"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "4975:9:1"
                              }
                            ],
                            "functionName": {
                              "name": "iszero",
                              "nodeType": "YulIdentifier",
                              "src": "4968:6:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "4968:17:1"
                          },
                          {
                            "arguments": [
                              {
                                "name": "y",
                                "nodeType": "YulIdentifier",
                                "src": "4990:1:1"
                              },
                              {
                                "arguments": [
                                  {
                                    "kind": "number",
                                    "nodeType": "YulLiteral",
                                    "src": "4997:66:1",
                                    "type": "",
                                    "value": "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
                                  },
                                  {
                                    "name": "x",
                                    "nodeType": "YulIdentifier",
                                    "src": "5065:1:1"
                                  }
                                ],
                                "functionName": {
                                  "name": "div",
                                  "nodeType": "YulIdentifier",
                                  "src": "4993:3:1"
                                },
                                "nodeType": "YulFunctionCall",
                                "src": "4993:74:1"
                              }
                            ],
                            "functionName": {
                              "name": "gt",
                              "nodeType": "YulIdentifier",
                              "src": "4987:2:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "4987:81:1"
                          }
                        ],
                        "functionName": {
                          "name": "and",
                          "nodeType": "YulIdentifier",
                          "src": "4964:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "4964:105:1"
                      },
                      "nodeType": "YulIf",
                      "src": "4961:131:1"
                    },
                    {
                      "nodeType": "YulAssignment",
                      "src": "5102:20:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "x",
                            "nodeType": "YulIdentifier",
                            "src": "5117:1:1"
                          },
                          {
                            "name": "y",
                            "nodeType": "YulIdentifier",
                            "src": "5120:1:1"
                          }
                        ],
                        "functionName": {
                          "name": "mul",
                          "nodeType": "YulIdentifier",
                          "src": "5113:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "5113:9:1"
                      },
                      "variableNames": [
                        {
                          "name": "product",
                          "nodeType": "YulIdentifier",
                          "src": "5102:7:1"
                        }
                      ]
                    }
                  ]
                },
                "name": "checked_mul_t_uint256",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "x",
                    "nodeType": "YulTypedName",
                    "src": "4811:1:1",
                    "type": ""
                  },
                  {
                    "name": "y",
                    "nodeType": "YulTypedName",
                    "src": "4814:1:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "product",
                    "nodeType": "YulTypedName",
                    "src": "4820:7:1",
                    "type": ""
                  }
                ],
                "src": "4780:348:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "5179:51:1",
                  "statements": [
                    {
                      "nodeType": "YulAssignment",
                      "src": "5189:35:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "5218:5:1"
                          }
                        ],
                        "functionName": {
                          "name": "cleanup_t_uint160",
                          "nodeType": "YulIdentifier",
                          "src": "5200:17:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "5200:24:1"
                      },
                      "variableNames": [
                        {
                          "name": "cleaned",
                          "nodeType": "YulIdentifier",
                          "src": "5189:7:1"
                        }
                      ]
                    }
                  ]
                },
                "name": "cleanup_t_address",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "value",
                    "nodeType": "YulTypedName",
                    "src": "5161:5:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "cleaned",
                    "nodeType": "YulTypedName",
                    "src": "5171:7:1",
                    "type": ""
                  }
                ],
                "src": "5134:96:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "5281:32:1",
                  "statements": [
                    {
                      "nodeType": "YulAssignment",
                      "src": "5291:16:1",
                      "value": {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "5302:5:1"
                      },
                      "variableNames": [
                        {
                          "name": "cleaned",
                          "nodeType": "YulIdentifier",
                          "src": "5291:7:1"
                        }
                      ]
                    }
                  ]
                },
                "name": "cleanup_t_bytes32",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "value",
                    "nodeType": "YulTypedName",
                    "src": "5263:5:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "cleaned",
                    "nodeType": "YulTypedName",
                    "src": "5273:7:1",
                    "type": ""
                  }
                ],
                "src": "5236:77:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "5364:81:1",
                  "statements": [
                    {
                      "nodeType": "YulAssignment",
                      "src": "5374:65:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "5389:5:1"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "5396:42:1",
                            "type": "",
                            "value": "0xffffffffffffffffffffffffffffffffffffffff"
                          }
                        ],
                        "functionName": {
                          "name": "and",
                          "nodeType": "YulIdentifier",
                          "src": "5385:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "5385:54:1"
                      },
                      "variableNames": [
                        {
                          "name": "cleaned",
                          "nodeType": "YulIdentifier",
                          "src": "5374:7:1"
                        }
                      ]
                    }
                  ]
                },
                "name": "cleanup_t_uint160",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "value",
                    "nodeType": "YulTypedName",
                    "src": "5346:5:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "cleaned",
                    "nodeType": "YulTypedName",
                    "src": "5356:7:1",
                    "type": ""
                  }
                ],
                "src": "5319:126:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "5496:32:1",
                  "statements": [
                    {
                      "nodeType": "YulAssignment",
                      "src": "5506:16:1",
                      "value": {
                        "name": "value",
                        "nodeType": "YulIdentifier",
                        "src": "5517:5:1"
                      },
                      "variableNames": [
                        {
                          "name": "cleaned",
                          "nodeType": "YulIdentifier",
                          "src": "5506:7:1"
                        }
                      ]
                    }
                  ]
                },
                "name": "cleanup_t_uint256",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "value",
                    "nodeType": "YulTypedName",
                    "src": "5478:5:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "cleaned",
                    "nodeType": "YulTypedName",
                    "src": "5488:7:1",
                    "type": ""
                  }
                ],
                "src": "5451:77:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "5577:43:1",
                  "statements": [
                    {
                      "nodeType": "YulAssignment",
                      "src": "5587:27:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "5602:5:1"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "5609:4:1",
                            "type": "",
                            "value": "0xff"
                          }
                        ],
                        "functionName": {
                          "name": "and",
                          "nodeType": "YulIdentifier",
                          "src": "5598:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "5598:16:1"
                      },
                      "variableNames": [
                        {
                          "name": "cleaned",
                          "nodeType": "YulIdentifier",
                          "src": "5587:7:1"
                        }
                      ]
                    }
                  ]
                },
                "name": "cleanup_t_uint8",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "value",
                    "nodeType": "YulTypedName",
                    "src": "5559:5:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "cleaned",
                    "nodeType": "YulTypedName",
                    "src": "5569:7:1",
                    "type": ""
                  }
                ],
                "src": "5534:86:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "5677:269:1",
                  "statements": [
                    {
                      "nodeType": "YulAssignment",
                      "src": "5687:22:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "data",
                            "nodeType": "YulIdentifier",
                            "src": "5701:4:1"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "5707:1:1",
                            "type": "",
                            "value": "2"
                          }
                        ],
                        "functionName": {
                          "name": "div",
                          "nodeType": "YulIdentifier",
                          "src": "5697:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "5697:12:1"
                      },
                      "variableNames": [
                        {
                          "name": "length",
                          "nodeType": "YulIdentifier",
                          "src": "5687:6:1"
                        }
                      ]
                    },
                    {
                      "nodeType": "YulVariableDeclaration",
                      "src": "5718:38:1",
                      "value": {
                        "arguments": [
                          {
                            "name": "data",
                            "nodeType": "YulIdentifier",
                            "src": "5748:4:1"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "5754:1:1",
                            "type": "",
                            "value": "1"
                          }
                        ],
                        "functionName": {
                          "name": "and",
                          "nodeType": "YulIdentifier",
                          "src": "5744:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "5744:12:1"
                      },
                      "variables": [
                        {
                          "name": "outOfPlaceEncoding",
                          "nodeType": "YulTypedName",
                          "src": "5722:18:1",
                          "type": ""
                        }
                      ]
                    },
                    {
                      "body": {
                        "nodeType": "YulBlock",
                        "src": "5795:51:1",
                        "statements": [
                          {
                            "nodeType": "YulAssignment",
                            "src": "5809:27:1",
                            "value": {
                              "arguments": [
                                {
                                  "name": "length",
                                  "nodeType": "YulIdentifier",
                                  "src": "5823:6:1"
                                },
                                {
                                  "kind": "number",
                                  "nodeType": "YulLiteral",
                                  "src": "5831:4:1",
                                  "type": "",
                                  "value": "0x7f"
                                }
                              ],
                              "functionName": {
                                "name": "and",
                                "nodeType": "YulIdentifier",
                                "src": "5819:3:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "5819:17:1"
                            },
                            "variableNames": [
                              {
                                "name": "length",
                                "nodeType": "YulIdentifier",
                                "src": "5809:6:1"
                              }
                            ]
                          }
                        ]
                      },
                      "condition": {
                        "arguments": [
                          {
                            "name": "outOfPlaceEncoding",
                            "nodeType": "YulIdentifier",
                            "src": "5775:18:1"
                          }
                        ],
                        "functionName": {
                          "name": "iszero",
                          "nodeType": "YulIdentifier",
                          "src": "5768:6:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "5768:26:1"
                      },
                      "nodeType": "YulIf",
                      "src": "5765:81:1"
                    },
                    {
                      "body": {
                        "nodeType": "YulBlock",
                        "src": "5898:42:1",
                        "statements": [
                          {
                            "expression": {
                              "arguments": [],
                              "functionName": {
                                "name": "panic_error_0x22",
                                "nodeType": "YulIdentifier",
                                "src": "5912:16:1"
                              },
                              "nodeType": "YulFunctionCall",
                              "src": "5912:18:1"
                            },
                            "nodeType": "YulExpressionStatement",
                            "src": "5912:18:1"
                          }
                        ]
                      },
                      "condition": {
                        "arguments": [
                          {
                            "name": "outOfPlaceEncoding",
                            "nodeType": "YulIdentifier",
                            "src": "5862:18:1"
                          },
                          {
                            "arguments": [
                              {
                                "name": "length",
                                "nodeType": "YulIdentifier",
                                "src": "5885:6:1"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "5893:2:1",
                                "type": "",
                                "value": "32"
                              }
                            ],
                            "functionName": {
                              "name": "lt",
                              "nodeType": "YulIdentifier",
                              "src": "5882:2:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "5882:14:1"
                          }
                        ],
                        "functionName": {
                          "name": "eq",
                          "nodeType": "YulIdentifier",
                          "src": "5859:2:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "5859:38:1"
                      },
                      "nodeType": "YulIf",
                      "src": "5856:84:1"
                    }
                  ]
                },
                "name": "extract_byte_array_length",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "data",
                    "nodeType": "YulTypedName",
                    "src": "5661:4:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "length",
                    "nodeType": "YulTypedName",
                    "src": "5670:6:1",
                    "type": ""
                  }
                ],
                "src": "5626:320:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "5980:152:1",
                  "statements": [
                    {
                      "expression": {
                        "arguments": [
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "5997:1:1",
                            "type": "",
                            "value": "0"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "6000:77:1",
                            "type": "",
                            "value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
                          }
                        ],
                        "functionName": {
                          "name": "mstore",
                          "nodeType": "YulIdentifier",
                          "src": "5990:6:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "5990:88:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "5990:88:1"
                    },
                    {
                      "expression": {
                        "arguments": [
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "6094:1:1",
                            "type": "",
                            "value": "4"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "6097:4:1",
                            "type": "",
                            "value": "0x11"
                          }
                        ],
                        "functionName": {
                          "name": "mstore",
                          "nodeType": "YulIdentifier",
                          "src": "6087:6:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "6087:15:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "6087:15:1"
                    },
                    {
                      "expression": {
                        "arguments": [
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "6118:1:1",
                            "type": "",
                            "value": "0"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "6121:4:1",
                            "type": "",
                            "value": "0x24"
                          }
                        ],
                        "functionName": {
                          "name": "revert",
                          "nodeType": "YulIdentifier",
                          "src": "6111:6:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "6111:15:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "6111:15:1"
                    }
                  ]
                },
                "name": "panic_error_0x11",
                "nodeType": "YulFunctionDefinition",
                "src": "5952:180:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "6166:152:1",
                  "statements": [
                    {
                      "expression": {
                        "arguments": [
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "6183:1:1",
                            "type": "",
                            "value": "0"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "6186:77:1",
                            "type": "",
                            "value": "35408467139433450592217433187231851964531694900788300625387963629091585785856"
                          }
                        ],
                        "functionName": {
                          "name": "mstore",
                          "nodeType": "YulIdentifier",
                          "src": "6176:6:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "6176:88:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "6176:88:1"
                    },
                    {
                      "expression": {
                        "arguments": [
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "6280:1:1",
                            "type": "",
                            "value": "4"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "6283:4:1",
                            "type": "",
                            "value": "0x22"
                          }
                        ],
                        "functionName": {
                          "name": "mstore",
                          "nodeType": "YulIdentifier",
                          "src": "6273:6:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "6273:15:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "6273:15:1"
                    },
                    {
                      "expression": {
                        "arguments": [
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "6304:1:1",
                            "type": "",
                            "value": "0"
                          },
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "6307:4:1",
                            "type": "",
                            "value": "0x24"
                          }
                        ],
                        "functionName": {
                          "name": "revert",
                          "nodeType": "YulIdentifier",
                          "src": "6297:6:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "6297:15:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "6297:15:1"
                    }
                  ]
                },
                "name": "panic_error_0x22",
                "nodeType": "YulFunctionDefinition",
                "src": "6138:180:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "6375:51:1",
                  "statements": [
                    {
                      "nodeType": "YulAssignment",
                      "src": "6385:34:1",
                      "value": {
                        "arguments": [
                          {
                            "kind": "number",
                            "nodeType": "YulLiteral",
                            "src": "6410:1:1",
                            "type": "",
                            "value": "1"
                          },
                          {
                            "name": "value",
                            "nodeType": "YulIdentifier",
                            "src": "6413:5:1"
                          }
                        ],
                        "functionName": {
                          "name": "shr",
                          "nodeType": "YulIdentifier",
                          "src": "6406:3:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "6406:13:1"
                      },
                      "variableNames": [
                        {
                          "name": "newValue",
                          "nodeType": "YulIdentifier",
                          "src": "6385:8:1"
                        }
                      ]
                    }
                  ]
                },
                "name": "shift_right_1_unsigned",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "value",
                    "nodeType": "YulTypedName",
                    "src": "6356:5:1",
                    "type": ""
                  }
                ],
                "returnVariables": [
                  {
                    "name": "newValue",
                    "nodeType": "YulTypedName",
                    "src": "6366:8:1",
                    "type": ""
                  }
                ],
                "src": "6324:102:1"
              },
              {
                "body": {
                  "nodeType": "YulBlock",
                  "src": "6538:75:1",
                  "statements": [
                    {
                      "expression": {
                        "arguments": [
                          {
                            "arguments": [
                              {
                                "name": "memPtr",
                                "nodeType": "YulIdentifier",
                                "src": "6560:6:1"
                              },
                              {
                                "kind": "number",
                                "nodeType": "YulLiteral",
                                "src": "6568:1:1",
                                "type": "",
                                "value": "0"
                              }
                            ],
                            "functionName": {
                              "name": "add",
                              "nodeType": "YulIdentifier",
                              "src": "6556:3:1"
                            },
                            "nodeType": "YulFunctionCall",
                            "src": "6556:14:1"
                          },
                          {
                            "hexValue": "45524332303a206d696e7420746f20746865207a65726f2061646472657373",
                            "kind": "string",
                            "nodeType": "YulLiteral",
                            "src": "6572:33:1",
                            "type": "",
                            "value": "ERC20: mint to the zero address"
                          }
                        ],
                        "functionName": {
                          "name": "mstore",
                          "nodeType": "YulIdentifier",
                          "src": "6549:6:1"
                        },
                        "nodeType": "YulFunctionCall",
                        "src": "6549:57:1"
                      },
                      "nodeType": "YulExpressionStatement",
                      "src": "6549:57:1"
                    }
                  ]
                },
                "name": "store_literal_in_memory_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e",
                "nodeType": "YulFunctionDefinition",
                "parameters": [
                  {
                    "name": "memPtr",
                    "nodeType": "YulTypedName",
                    "src": "6530:6:1",
                    "type": ""
                  }
                ],
                "src": "6432:181:1"
              }
            ]
          },
          "contents": "{\n\n    function abi_encode_t_address_to_t_address_fromStack(value, pos) {\n        mstore(pos, cleanup_t_address(value))\n    }\n\n    function abi_encode_t_bytes32_to_t_bytes32_fromStack(value, pos) {\n        mstore(pos, cleanup_t_bytes32(value))\n    }\n\n    function abi_encode_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e_to_t_string_memory_ptr_fromStack(pos) -> end {\n        pos := array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, 31)\n        store_literal_in_memory_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e(pos)\n        end := add(pos, 32)\n    }\n\n    function abi_encode_t_uint256_to_t_uint256_fromStack(value, pos) {\n        mstore(pos, cleanup_t_uint256(value))\n    }\n\n    function abi_encode_tuple_t_bytes32_t_bytes32_t_bytes32_t_uint256_t_address__to_t_bytes32_t_bytes32_t_bytes32_t_uint256_t_address__fromStack_reversed(headStart , value4, value3, value2, value1, value0) -> tail {\n        tail := add(headStart, 160)\n\n        abi_encode_t_bytes32_to_t_bytes32_fromStack(value0,  add(headStart, 0))\n\n        abi_encode_t_bytes32_to_t_bytes32_fromStack(value1,  add(headStart, 32))\n\n        abi_encode_t_bytes32_to_t_bytes32_fromStack(value2,  add(headStart, 64))\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value3,  add(headStart, 96))\n\n        abi_encode_t_address_to_t_address_fromStack(value4,  add(headStart, 128))\n\n    }\n\n    function abi_encode_tuple_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e__to_t_string_memory_ptr__fromStack_reversed(headStart ) -> tail {\n        tail := add(headStart, 32)\n\n        mstore(add(headStart, 0), sub(tail, headStart))\n        tail := abi_encode_t_stringliteral_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e_to_t_string_memory_ptr_fromStack( tail)\n\n    }\n\n    function abi_encode_tuple_t_uint256__to_t_uint256__fromStack_reversed(headStart , value0) -> tail {\n        tail := add(headStart, 32)\n\n        abi_encode_t_uint256_to_t_uint256_fromStack(value0,  add(headStart, 0))\n\n    }\n\n    function array_storeLengthForEncoding_t_string_memory_ptr_fromStack(pos, length) -> updated_pos {\n        mstore(pos, length)\n        updated_pos := add(pos, 0x20)\n    }\n\n    function checked_add_t_uint256(x, y) -> sum {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n\n        // overflow, if x > (maxValue - y)\n        if gt(x, sub(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, y)) { panic_error_0x11() }\n\n        sum := add(x, y)\n    }\n\n    function checked_exp_helper(_power, _base, exponent, max) -> power, base {\n        power := _power\n        base  := _base\n        for { } gt(exponent, 1) {}\n        {\n            // overflow check for base * base\n            if gt(base, div(max, base)) { panic_error_0x11() }\n            if and(exponent, 1)\n            {\n                // No checks for power := mul(power, base) needed, because the check\n                // for base * base above is sufficient, since:\n                // |power| <= base (proof by induction) and thus:\n                // |power * base| <= base * base <= max <= |min| (for signed)\n                // (this is equally true for signed and unsigned exp)\n                power := mul(power, base)\n            }\n            base := mul(base, base)\n            exponent := shift_right_1_unsigned(exponent)\n        }\n    }\n\n    function checked_exp_t_uint256_t_uint8(base, exponent) -> power {\n        base := cleanup_t_uint256(base)\n        exponent := cleanup_t_uint8(exponent)\n\n        power := checked_exp_unsigned(base, exponent, 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff)\n\n    }\n\n    function checked_exp_unsigned(base, exponent, max) -> power {\n        // This function currently cannot be inlined because of the\n        // \"leave\" statements. We have to improve the optimizer.\n\n        // Note that 0**0 == 1\n        if iszero(exponent) { power := 1 leave }\n        if iszero(base) { power := 0 leave }\n\n        // Specializations for small bases\n        switch base\n        // 0 is handled above\n        case 1 { power := 1 leave }\n        case 2\n        {\n            if gt(exponent, 255) { panic_error_0x11() }\n            power := exp(2, exponent)\n            if gt(power, max) { panic_error_0x11() }\n            leave\n        }\n        if or(\n            and(lt(base, 11), lt(exponent, 78)),\n            and(lt(base, 307), lt(exponent, 32))\n        )\n        {\n            power := exp(base, exponent)\n            if gt(power, max) { panic_error_0x11() }\n            leave\n        }\n\n        power, base := checked_exp_helper(1, base, exponent, max)\n\n        if gt(power, div(max, base)) { panic_error_0x11() }\n        power := mul(power, base)\n    }\n\n    function checked_mul_t_uint256(x, y) -> product {\n        x := cleanup_t_uint256(x)\n        y := cleanup_t_uint256(y)\n\n        // overflow, if x != 0 and y > (maxValue / x)\n        if and(iszero(iszero(x)), gt(y, div(0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff, x))) { panic_error_0x11() }\n\n        product := mul(x, y)\n    }\n\n    function cleanup_t_address(value) -> cleaned {\n        cleaned := cleanup_t_uint160(value)\n    }\n\n    function cleanup_t_bytes32(value) -> cleaned {\n        cleaned := value\n    }\n\n    function cleanup_t_uint160(value) -> cleaned {\n        cleaned := and(value, 0xffffffffffffffffffffffffffffffffffffffff)\n    }\n\n    function cleanup_t_uint256(value) -> cleaned {\n        cleaned := value\n    }\n\n    function cleanup_t_uint8(value) -> cleaned {\n        cleaned := and(value, 0xff)\n    }\n\n    function extract_byte_array_length(data) -> length {\n        length := div(data, 2)\n        let outOfPlaceEncoding := and(data, 1)\n        if iszero(outOfPlaceEncoding) {\n            length := and(length, 0x7f)\n        }\n\n        if eq(outOfPlaceEncoding, lt(length, 32)) {\n            panic_error_0x22()\n        }\n    }\n\n    function panic_error_0x11() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x11)\n        revert(0, 0x24)\n    }\n\n    function panic_error_0x22() {\n        mstore(0, 35408467139433450592217433187231851964531694900788300625387963629091585785856)\n        mstore(4, 0x22)\n        revert(0, 0x24)\n    }\n\n    function shift_right_1_unsigned(value) -> newValue {\n        newValue :=\n\n        shr(1, value)\n\n    }\n\n    function store_literal_in_memory_fc0b381caf0a47702017f3c4b358ebe3d3aff6c60ce819a8bf3ef5a95d4f202e(memPtr) {\n\n        mstore(add(memPtr, 0), \"ERC20: mint to the zero address\")\n\n    }\n\n}\n",
          "id": 1,
          "language": "Yul",
          "name": "#utility.yul"
        }
      ],
      "linkReferences": {},
      "object": "6101606040527f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9610140908152503480156200003a57600080fd5b506040518060400160405280600381526020017f5454540000000000000000000000000000000000000000000000000000000000815250806040518060400160405280600181526020017f31000000000000000000000000000000000000000000000000000000000000008152506040518060400160405280600c81526020017f544553494e4720544f4b454e00000000000000000000000000000000000000008152506040518060400160405280600381526020017f545454000000000000000000000000000000000000000000000000000000000081525081600390805190602001906200012c9291906200040b565b508060049080519060200190620001459291906200040b565b50505060008280519060200120905060008280519060200120905060007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f90508260e081815250508161010081815250504660a08181525050620001b18184846200024360201b60201c565b608081815250503073ffffffffffffffffffffffffffffffffffffffff1660c08173ffffffffffffffffffffffffffffffffffffffff1660601b815250508061012081815250505050505050506200023d33620002136200027f60201b60201c565b600a6200022191906200067a565b620186a0620002319190620007b7565b6200028860201b60201c565b62000937565b600083838346306040516020016200026095949392919062000515565b6040516020818303038152906040528051906020012090509392505050565b60006012905090565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415620002fb576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620002f29062000572565b60405180910390fd5b6200030f600083836200040160201b60201c565b8060026000828254620003239190620005c2565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546200037a9190620005c2565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620003e1919062000594565b60405180910390a3620003fd600083836200040660201b60201c565b5050565b505050565b505050565b82805462000419906200086d565b90600052602060002090601f0160209004810192826200043d576000855562000489565b82601f106200045857805160ff191683800117855562000489565b8280016001018555821562000489579182015b82811115620004885782518255916020019190600101906200046b565b5b5090506200049891906200049c565b5090565b5b80821115620004b75760008160009055506001016200049d565b5090565b620004c68162000818565b82525050565b620004d7816200082c565b82525050565b6000620004ec601f83620005b1565b9150620004f9826200090e565b602082019050919050565b6200050f8162000856565b82525050565b600060a0820190506200052c6000830188620004cc565b6200053b6020830187620004cc565b6200054a6040830186620004cc565b62000559606083018562000504565b620005686080830184620004bb565b9695505050505050565b600060208201905081810360008301526200058d81620004dd565b9050919050565b6000602082019050620005ab600083018462000504565b92915050565b600082825260208201905092915050565b6000620005cf8262000856565b9150620005dc8362000856565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff03821115620006145762000613620008a3565b5b828201905092915050565b6000808291508390505b60018511156200067157808604811115620006495762000648620008a3565b5b6001851615620006595780820291505b8081029050620006698562000901565b945062000629565b94509492505050565b6000620006878262000856565b9150620006948362000860565b9250620006c37fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8484620006cb565b905092915050565b600082620006dd5760019050620007b0565b81620006ed5760009050620007b0565b8160018114620007065760028114620007115762000747565b6001915050620007b0565b60ff841115620007265762000725620008a3565b5b8360020a91508482111562000740576200073f620008a3565b5b50620007b0565b5060208310610133831016604e8410600b8410161715620007815782820a9050838111156200077b576200077a620008a3565b5b620007b0565b6200079084848460016200061f565b92509050818404811115620007aa57620007a9620008a3565b5b81810290505b9392505050565b6000620007c48262000856565b9150620007d18362000856565b9250817fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff04831182151516156200080d576200080c620008a3565b5b828202905092915050565b6000620008258262000836565b9050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b600060028204905060018216806200088657607f821691505b602082108114156200089d576200089c620008d2565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60008160011c9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b60805160a05160c05160601c60e0516101005161012051610140516127d962000995600039600061092201526000610fa601526000610fe801526000610fc701526000610efc01526000610f5201526000610f7b01526127d96000f3fe608060405234801561001057600080fd5b506004361061010b5760003560e01c806370a08231116100a2578063a0712d6811610071578063a0712d68146102ce578063a457c2d7146102ea578063a9059cbb1461031a578063d505accf1461034a578063dd62ed3e146103665761010b565b806370a082311461023457806379cc6790146102645780637ecebe001461028057806395d89b41146102b05761010b565b8063313ce567116100de578063313ce567146101ac5780633644e515146101ca57806339509351146101e857806342966c68146102185761010b565b806306fdde0314610110578063095ea7b31461012e57806318160ddd1461015e57806323b872dd1461017c575b600080fd5b610118610396565b6040516101259190611e03565b60405180910390f35b6101486004803603810190610143919061191f565b610428565b6040516101559190611cd4565b60405180910390f35b610166610446565b6040516101739190612045565b60405180910390f35b6101966004803603810190610191919061182a565b610450565b6040516101a39190611cd4565b60405180910390f35b6101b4610548565b6040516101c19190612060565b60405180910390f35b6101d2610551565b6040516101df9190611cef565b60405180910390f35b61020260048036038101906101fd919061191f565b610560565b60405161020f9190611cd4565b60405180910390f35b610232600480360381019061022d919061195f565b61060c565b005b61024e600480360381019061024991906117bd565b610620565b60405161025b9190612045565b60405180910390f35b61027e6004803603810190610279919061191f565b610668565b005b61029a600480360381019061029591906117bd565b6106e3565b6040516102a79190612045565b60405180910390f35b6102b8610733565b6040516102c59190611e03565b60405180910390f35b6102e860048036038101906102e3919061195f565b6107c5565b005b61030460048036038101906102ff919061191f565b6107d2565b6040516103119190611cd4565b60405180910390f35b610334600480360381019061032f919061191f565b6108bd565b6040516103419190611cd4565b60405180910390f35b610364600480360381019061035f919061187d565b6108db565b005b610380600480360381019061037b91906117ea565b610a1d565b60405161038d9190612045565b60405180910390f35b6060600380546103a5906121be565b80601f01602080910402602001604051908101604052809291908181526020018280546103d1906121be565b801561041e5780601f106103f35761010080835404028352916020019161041e565b820191906000526020600020905b81548152906001019060200180831161040157829003601f168201915b5050505050905090565b600061043c610435610aa4565b8484610aac565b6001905092915050565b6000600254905090565b600061045d848484610c77565b6000600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006104a8610aa4565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905082811015610528576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161051f90611f65565b60405180910390fd5b61053c85610534610aa4565b858403610aac565b60019150509392505050565b60006012905090565b600061055b610ef8565b905090565b600061060261056d610aa4565b84846001600061057b610aa4565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008873ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020546105fd91906120a2565b610aac565b6001905092915050565b61061d610617610aa4565b82611012565b50565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b600061067b83610676610aa4565b610a1d565b9050818110156106c0576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016106b790611f85565b60405180910390fd5b6106d4836106cc610aa4565b848403610aac565b6106de8383611012565b505050565b600061072c600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206111e9565b9050919050565b606060048054610742906121be565b80601f016020809104026020016040519081016040528092919081815260200182805461076e906121be565b80156107bb5780601f10610790576101008083540402835291602001916107bb565b820191906000526020600020905b81548152906001019060200180831161079e57829003601f168201915b5050505050905090565b6107cf33826111f7565b50565b600080600160006107e1610aa4565b73ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205490508281101561089e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161089590612005565b60405180910390fd5b6108b26108a9610aa4565b85858403610aac565b600191505092915050565b60006108d16108ca610aa4565b8484610c77565b6001905092915050565b8342111561091e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161091590611ec5565b60405180910390fd5b60007f000000000000000000000000000000000000000000000000000000000000000088888861094d8c611357565b8960405160200161096396959493929190611d0a565b6040516020818303038152906040528051906020012090506000610986826113b5565b90506000610996828787876113cf565b90508973ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614610a06576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109fd90611f45565b60405180910390fd5b610a118a8a8a610aac565b50505050505050505050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610b1c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b1390611fe5565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610b8c576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610b8390611ea5565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92583604051610c6a9190612045565b60405180910390a3505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff161415610ce7576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cde90611fc5565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415610d57576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610d4e90611e45565b60405180910390fd5b610d628383836113fa565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610de8576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ddf90611ee5565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254610e7b91906120a2565b925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610edf9190612045565b60405180910390a3610ef28484846113ff565b50505050565b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff163073ffffffffffffffffffffffffffffffffffffffff16148015610f7457507f000000000000000000000000000000000000000000000000000000000000000046145b15610fa1577f0000000000000000000000000000000000000000000000000000000000000000905061100f565b61100c7f00000000000000000000000000000000000000000000000000000000000000007f00000000000000000000000000000000000000000000000000000000000000007f0000000000000000000000000000000000000000000000000000000000000000611404565b90505b90565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611082576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161107990611fa5565b60405180910390fd5b61108e826000836113fa565b60008060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015611114576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161110b90611e65565b60405180910390fd5b8181036000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816002600082825461116b91906120f8565b92505081905550600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040516111d09190612045565b60405180910390a36111e4836000846113ff565b505050565b600081600001549050919050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff161415611267576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161125e90612025565b60405180910390fd5b611273600083836113fa565b806002600082825461128591906120a2565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008282546112da91906120a2565b925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef8360405161133f9190612045565b60405180910390a3611353600083836113ff565b5050565b600080600560008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002090506113a4816111e9565b91506113af8161143e565b50919050565b60006113c86113c2610ef8565b83611454565b9050919050565b60008060006113e087878787611487565b915091506113ed81611594565b8192505050949350505050565b505050565b505050565b6000838383463060405160200161141f959493929190611d6b565b6040516020818303038152906040528051906020012090509392505050565b6001816000016000828254019250508190555050565b60008282604051602001611469929190611c9d565b60405160208183030381529060405280519060200120905092915050565b6000807f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a08360001c11156114c257600060039150915061158b565b601b8560ff16141580156114da5750601c8560ff1614155b156114ec57600060049150915061158b565b6000600187878787604051600081526020016040526040516115119493929190611dbe565b6020604051602081039080840390855afa158015611533573d6000803e3d6000fd5b505050602060405103519050600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1614156115825760006001925092505061158b565b80600092509250505b94509492505050565b600060048111156115a8576115a7612229565b5b8160048111156115bb576115ba612229565b5b14156115c657611766565b600160048111156115da576115d9612229565b5b8160048111156115ed576115ec612229565b5b141561162e576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161162590611e25565b60405180910390fd5b6002600481111561164257611641612229565b5b81600481111561165557611654612229565b5b1415611696576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161168d90611e85565b60405180910390fd5b600360048111156116aa576116a9612229565b5b8160048111156116bd576116bc612229565b5b14156116fe576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016116f590611f05565b60405180910390fd5b60048081111561171157611710612229565b5b81600481111561172457611723612229565b5b1415611765576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161175c90611f25565b60405180910390fd5b5b50565b60008135905061177881612747565b92915050565b60008135905061178d8161275e565b92915050565b6000813590506117a281612775565b92915050565b6000813590506117b78161278c565b92915050565b6000602082840312156117d3576117d2612287565b5b60006117e184828501611769565b91505092915050565b6000806040838503121561180157611800612287565b5b600061180f85828601611769565b925050602061182085828601611769565b9150509250929050565b60008060006060848603121561184357611842612287565b5b600061185186828701611769565b935050602061186286828701611769565b925050604061187386828701611793565b9150509250925092565b600080600080600080600060e0888a03121561189c5761189b612287565b5b60006118aa8a828b01611769565b97505060206118bb8a828b01611769565b96505060406118cc8a828b01611793565b95505060606118dd8a828b01611793565b94505060806118ee8a828b016117a8565b93505060a06118ff8a828b0161177e565b92505060c06119108a828b0161177e565b91505092959891949750929550565b6000806040838503121561193657611935612287565b5b600061194485828601611769565b925050602061195585828601611793565b9150509250929050565b60006020828403121561197557611974612287565b5b600061198384828501611793565b91505092915050565b6119958161212c565b82525050565b6119a48161213e565b82525050565b6119b38161214a565b82525050565b6119ca6119c58261214a565b6121f0565b82525050565b60006119db8261207b565b6119e58185612086565b93506119f581856020860161218b565b6119fe8161228c565b840191505092915050565b6000611a16601883612086565b9150611a218261229d565b602082019050919050565b6000611a39602383612086565b9150611a44826122c6565b604082019050919050565b6000611a5c602283612086565b9150611a6782612315565b604082019050919050565b6000611a7f601f83612086565b9150611a8a82612364565b602082019050919050565b6000611aa2602283612086565b9150611aad8261238d565b604082019050919050565b6000611ac5600283612097565b9150611ad0826123dc565b600282019050919050565b6000611ae8601d83612086565b9150611af382612405565b602082019050919050565b6000611b0b602683612086565b9150611b168261242e565b604082019050919050565b6000611b2e602283612086565b9150611b398261247d565b604082019050919050565b6000611b51602283612086565b9150611b5c826124cc565b604082019050919050565b6000611b74601e83612086565b9150611b7f8261251b565b602082019050919050565b6000611b97602883612086565b9150611ba282612544565b604082019050919050565b6000611bba602483612086565b9150611bc582612593565b604082019050919050565b6000611bdd602183612086565b9150611be8826125e2565b604082019050919050565b6000611c00602583612086565b9150611c0b82612631565b604082019050919050565b6000611c23602483612086565b9150611c2e82612680565b604082019050919050565b6000611c46602583612086565b9150611c51826126cf565b604082019050919050565b6000611c69601f83612086565b9150611c748261271e565b602082019050919050565b611c8881612174565b82525050565b611c978161217e565b82525050565b6000611ca882611ab8565b9150611cb482856119b9565b602082019150611cc482846119b9565b6020820191508190509392505050565b6000602082019050611ce9600083018461199b565b92915050565b6000602082019050611d0460008301846119aa565b92915050565b600060c082019050611d1f60008301896119aa565b611d2c602083018861198c565b611d39604083018761198c565b611d466060830186611c7f565b611d536080830185611c7f565b611d6060a0830184611c7f565b979650505050505050565b600060a082019050611d8060008301886119aa565b611d8d60208301876119aa565b611d9a60408301866119aa565b611da76060830185611c7f565b611db4608083018461198c565b9695505050505050565b6000608082019050611dd360008301876119aa565b611de06020830186611c8e565b611ded60408301856119aa565b611dfa60608301846119aa565b95945050505050565b60006020820190508181036000830152611e1d81846119d0565b905092915050565b60006020820190508181036000830152611e3e81611a09565b9050919050565b60006020820190508181036000830152611e5e81611a2c565b9050919050565b60006020820190508181036000830152611e7e81611a4f565b9050919050565b60006020820190508181036000830152611e9e81611a72565b9050919050565b60006020820190508181036000830152611ebe81611a95565b9050919050565b60006020820190508181036000830152611ede81611adb565b9050919050565b60006020820190508181036000830152611efe81611afe565b9050919050565b60006020820190508181036000830152611f1e81611b21565b9050919050565b60006020820190508181036000830152611f3e81611b44565b9050919050565b60006020820190508181036000830152611f5e81611b67565b9050919050565b60006020820190508181036000830152611f7e81611b8a565b9050919050565b60006020820190508181036000830152611f9e81611bad565b9050919050565b60006020820190508181036000830152611fbe81611bd0565b9050919050565b60006020820190508181036000830152611fde81611bf3565b9050919050565b60006020820190508181036000830152611ffe81611c16565b9050919050565b6000602082019050818103600083015261201e81611c39565b9050919050565b6000602082019050818103600083015261203e81611c5c565b9050919050565b600060208201905061205a6000830184611c7f565b92915050565b60006020820190506120756000830184611c8e565b92915050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b60006120ad82612174565b91506120b883612174565b9250827fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff038211156120ed576120ec6121fa565b5b828201905092915050565b600061210382612174565b915061210e83612174565b925082821015612121576121206121fa565b5b828203905092915050565b600061213782612154565b9050919050565b60008115159050919050565b6000819050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000819050919050565b600060ff82169050919050565b60005b838110156121a957808201518184015260208101905061218e565b838111156121b8576000848401525b50505050565b600060028204905060018216806121d657607f821691505b602082108114156121ea576121e9612258565b5b50919050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600080fd5b6000601f19601f8301169050919050565b7f45434453413a20696e76616c6964207369676e61747572650000000000000000600082015250565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206275726e20616d6f756e7420657863656564732062616c616e60008201527f6365000000000000000000000000000000000000000000000000000000000000602082015250565b7f45434453413a20696e76616c6964207369676e6174757265206c656e67746800600082015250565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b7f1901000000000000000000000000000000000000000000000000000000000000600082015250565b7f45524332305065726d69743a206578706972656420646561646c696e65000000600082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b7f45434453413a20696e76616c6964207369676e6174757265202773272076616c60008201527f7565000000000000000000000000000000000000000000000000000000000000602082015250565b7f45434453413a20696e76616c6964207369676e6174757265202776272076616c60008201527f7565000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332305065726d69743a20696e76616c6964207369676e61747572650000600082015250565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206160008201527f6c6c6f77616e6365000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206275726e20616d6f756e74206578636565647320616c6c6f7760008201527f616e636500000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206275726e2066726f6d20746865207a65726f2061646472657360008201527f7300000000000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6127508161212c565b811461275b57600080fd5b50565b6127678161214a565b811461277257600080fd5b50565b61277e81612174565b811461278957600080fd5b50565b6127958161217e565b81146127a057600080fd5b5056fea2646970667358221220fadb2481a8032a7c6d6ada9c67bcdc16c0c2c938b97dd45fccafe6327b7488f564736f6c63430008070033",
      "opcodes": "PUSH2 0x160 PUSH1 0x40 MSTORE PUSH32 0x6E71EDAE12B1B97F4D1F60370FEF10105FA2FAAE0126114A169C64845D6126C9 PUSH2 0x140 SWAP1 DUP2 MSTORE POP CALLVALUE DUP1 ISZERO PUSH3 0x3A JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x3 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x5454540000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP DUP1 PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x1 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x3100000000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0xC DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x544553494E4720544F4B454E0000000000000000000000000000000000000000 DUP2 MSTORE POP PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x3 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x5454540000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE POP DUP2 PUSH1 0x3 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH3 0x12C SWAP3 SWAP2 SWAP1 PUSH3 0x40B JUMP JUMPDEST POP DUP1 PUSH1 0x4 SWAP1 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 PUSH3 0x145 SWAP3 SWAP2 SWAP1 PUSH3 0x40B JUMP JUMPDEST POP POP POP PUSH1 0x0 DUP3 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD KECCAK256 SWAP1 POP PUSH1 0x0 DUP3 DUP1 MLOAD SWAP1 PUSH1 0x20 ADD KECCAK256 SWAP1 POP PUSH1 0x0 PUSH32 0x8B73C3C69BB8FE3D512ECC4CF759CC79239F7B179B0FFACAA9A75D522B39400F SWAP1 POP DUP3 PUSH1 0xE0 DUP2 DUP2 MSTORE POP POP DUP2 PUSH2 0x100 DUP2 DUP2 MSTORE POP POP CHAINID PUSH1 0xA0 DUP2 DUP2 MSTORE POP POP PUSH3 0x1B1 DUP2 DUP5 DUP5 PUSH3 0x243 PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST PUSH1 0x80 DUP2 DUP2 MSTORE POP POP ADDRESS PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0xC0 DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x60 SHL DUP2 MSTORE POP POP DUP1 PUSH2 0x120 DUP2 DUP2 MSTORE POP POP POP POP POP POP POP POP PUSH3 0x23D CALLER PUSH3 0x213 PUSH3 0x27F PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST PUSH1 0xA PUSH3 0x221 SWAP2 SWAP1 PUSH3 0x67A JUMP JUMPDEST PUSH3 0x186A0 PUSH3 0x231 SWAP2 SWAP1 PUSH3 0x7B7 JUMP JUMPDEST PUSH3 0x288 PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST PUSH3 0x937 JUMP JUMPDEST PUSH1 0x0 DUP4 DUP4 DUP4 CHAINID ADDRESS PUSH1 0x40 MLOAD PUSH1 0x20 ADD PUSH3 0x260 SWAP6 SWAP5 SWAP4 SWAP3 SWAP2 SWAP1 PUSH3 0x515 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x20 DUP2 DUP4 SUB SUB DUP2 MSTORE SWAP1 PUSH1 0x40 MSTORE DUP1 MLOAD SWAP1 PUSH1 0x20 ADD KECCAK256 SWAP1 POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x12 SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH3 0x2FB JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH3 0x2F2 SWAP1 PUSH3 0x572 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH3 0x30F PUSH1 0x0 DUP4 DUP4 PUSH3 0x401 PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST DUP1 PUSH1 0x2 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH3 0x323 SWAP2 SWAP1 PUSH3 0x5C2 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP DUP1 PUSH1 0x0 DUP1 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH3 0x37A SWAP2 SWAP1 PUSH3 0x5C2 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF DUP4 PUSH1 0x40 MLOAD PUSH3 0x3E1 SWAP2 SWAP1 PUSH3 0x594 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 PUSH3 0x3FD PUSH1 0x0 DUP4 DUP4 PUSH3 0x406 PUSH1 0x20 SHL PUSH1 0x20 SHR JUMP JUMPDEST POP POP JUMP JUMPDEST POP POP POP JUMP JUMPDEST POP POP POP JUMP JUMPDEST DUP3 DUP1 SLOAD PUSH3 0x419 SWAP1 PUSH3 0x86D JUMP JUMPDEST SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 PUSH1 0x1F ADD PUSH1 0x20 SWAP1 DIV DUP2 ADD SWAP3 DUP3 PUSH3 0x43D JUMPI PUSH1 0x0 DUP6 SSTORE PUSH3 0x489 JUMP JUMPDEST DUP3 PUSH1 0x1F LT PUSH3 0x458 JUMPI DUP1 MLOAD PUSH1 0xFF NOT AND DUP4 DUP1 ADD OR DUP6 SSTORE PUSH3 0x489 JUMP JUMPDEST DUP3 DUP1 ADD PUSH1 0x1 ADD DUP6 SSTORE DUP3 ISZERO PUSH3 0x489 JUMPI SWAP2 DUP3 ADD JUMPDEST DUP3 DUP2 GT ISZERO PUSH3 0x488 JUMPI DUP3 MLOAD DUP3 SSTORE SWAP2 PUSH1 0x20 ADD SWAP2 SWAP1 PUSH1 0x1 ADD SWAP1 PUSH3 0x46B JUMP JUMPDEST JUMPDEST POP SWAP1 POP PUSH3 0x498 SWAP2 SWAP1 PUSH3 0x49C JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST JUMPDEST DUP1 DUP3 GT ISZERO PUSH3 0x4B7 JUMPI PUSH1 0x0 DUP2 PUSH1 0x0 SWAP1 SSTORE POP PUSH1 0x1 ADD PUSH3 0x49D JUMP JUMPDEST POP SWAP1 JUMP JUMPDEST PUSH3 0x4C6 DUP2 PUSH3 0x818 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH3 0x4D7 DUP2 PUSH3 0x82C JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH3 0x4EC PUSH1 0x1F DUP4 PUSH3 0x5B1 JUMP JUMPDEST SWAP2 POP PUSH3 0x4F9 DUP3 PUSH3 0x90E JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH3 0x50F DUP2 PUSH3 0x856 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0xA0 DUP3 ADD SWAP1 POP PUSH3 0x52C PUSH1 0x0 DUP4 ADD DUP9 PUSH3 0x4CC JUMP JUMPDEST PUSH3 0x53B PUSH1 0x20 DUP4 ADD DUP8 PUSH3 0x4CC JUMP JUMPDEST PUSH3 0x54A PUSH1 0x40 DUP4 ADD DUP7 PUSH3 0x4CC JUMP JUMPDEST PUSH3 0x559 PUSH1 0x60 DUP4 ADD DUP6 PUSH3 0x504 JUMP JUMPDEST PUSH3 0x568 PUSH1 0x80 DUP4 ADD DUP5 PUSH3 0x4BB JUMP JUMPDEST SWAP7 SWAP6 POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH3 0x58D DUP2 PUSH3 0x4DD JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH3 0x5AB PUSH1 0x0 DUP4 ADD DUP5 PUSH3 0x504 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH3 0x5CF DUP3 PUSH3 0x856 JUMP JUMPDEST SWAP2 POP PUSH3 0x5DC DUP4 PUSH3 0x856 JUMP JUMPDEST SWAP3 POP DUP3 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SUB DUP3 GT ISZERO PUSH3 0x614 JUMPI PUSH3 0x613 PUSH3 0x8A3 JUMP JUMPDEST JUMPDEST DUP3 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 DUP3 SWAP2 POP DUP4 SWAP1 POP JUMPDEST PUSH1 0x1 DUP6 GT ISZERO PUSH3 0x671 JUMPI DUP1 DUP7 DIV DUP2 GT ISZERO PUSH3 0x649 JUMPI PUSH3 0x648 PUSH3 0x8A3 JUMP JUMPDEST JUMPDEST PUSH1 0x1 DUP6 AND ISZERO PUSH3 0x659 JUMPI DUP1 DUP3 MUL SWAP2 POP JUMPDEST DUP1 DUP2 MUL SWAP1 POP PUSH3 0x669 DUP6 PUSH3 0x901 JUMP JUMPDEST SWAP5 POP PUSH3 0x629 JUMP JUMPDEST SWAP5 POP SWAP5 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH3 0x687 DUP3 PUSH3 0x856 JUMP JUMPDEST SWAP2 POP PUSH3 0x694 DUP4 PUSH3 0x860 JUMP JUMPDEST SWAP3 POP PUSH3 0x6C3 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP5 DUP5 PUSH3 0x6CB JUMP JUMPDEST SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 PUSH3 0x6DD JUMPI PUSH1 0x1 SWAP1 POP PUSH3 0x7B0 JUMP JUMPDEST DUP2 PUSH3 0x6ED JUMPI PUSH1 0x0 SWAP1 POP PUSH3 0x7B0 JUMP JUMPDEST DUP2 PUSH1 0x1 DUP2 EQ PUSH3 0x706 JUMPI PUSH1 0x2 DUP2 EQ PUSH3 0x711 JUMPI PUSH3 0x747 JUMP JUMPDEST PUSH1 0x1 SWAP2 POP POP PUSH3 0x7B0 JUMP JUMPDEST PUSH1 0xFF DUP5 GT ISZERO PUSH3 0x726 JUMPI PUSH3 0x725 PUSH3 0x8A3 JUMP JUMPDEST JUMPDEST DUP4 PUSH1 0x2 EXP SWAP2 POP DUP5 DUP3 GT ISZERO PUSH3 0x740 JUMPI PUSH3 0x73F PUSH3 0x8A3 JUMP JUMPDEST JUMPDEST POP PUSH3 0x7B0 JUMP JUMPDEST POP PUSH1 0x20 DUP4 LT PUSH2 0x133 DUP4 LT AND PUSH1 0x4E DUP5 LT PUSH1 0xB DUP5 LT AND OR ISZERO PUSH3 0x781 JUMPI DUP3 DUP3 EXP SWAP1 POP DUP4 DUP2 GT ISZERO PUSH3 0x77B JUMPI PUSH3 0x77A PUSH3 0x8A3 JUMP JUMPDEST JUMPDEST PUSH3 0x7B0 JUMP JUMPDEST PUSH3 0x790 DUP5 DUP5 DUP5 PUSH1 0x1 PUSH3 0x61F JUMP JUMPDEST SWAP3 POP SWAP1 POP DUP2 DUP5 DIV DUP2 GT ISZERO PUSH3 0x7AA JUMPI PUSH3 0x7A9 PUSH3 0x8A3 JUMP JUMPDEST JUMPDEST DUP2 DUP2 MUL SWAP1 POP JUMPDEST SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH3 0x7C4 DUP3 PUSH3 0x856 JUMP JUMPDEST SWAP2 POP PUSH3 0x7D1 DUP4 PUSH3 0x856 JUMP JUMPDEST SWAP3 POP DUP2 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DIV DUP4 GT DUP3 ISZERO ISZERO AND ISZERO PUSH3 0x80D JUMPI PUSH3 0x80C PUSH3 0x8A3 JUMP JUMPDEST JUMPDEST DUP3 DUP3 MUL SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH3 0x825 DUP3 PUSH3 0x836 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0xFF DUP3 AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 DUP3 DIV SWAP1 POP PUSH1 0x1 DUP3 AND DUP1 PUSH3 0x886 JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 EQ ISZERO PUSH3 0x89D JUMPI PUSH3 0x89C PUSH3 0x8D2 JUMP JUMPDEST JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 DUP2 PUSH1 0x1 SHR SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x45524332303A206D696E7420746F20746865207A65726F206164647265737300 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH1 0x80 MLOAD PUSH1 0xA0 MLOAD PUSH1 0xC0 MLOAD PUSH1 0x60 SHR PUSH1 0xE0 MLOAD PUSH2 0x100 MLOAD PUSH2 0x120 MLOAD PUSH2 0x140 MLOAD PUSH2 0x27D9 PUSH3 0x995 PUSH1 0x0 CODECOPY PUSH1 0x0 PUSH2 0x922 ADD MSTORE PUSH1 0x0 PUSH2 0xFA6 ADD MSTORE PUSH1 0x0 PUSH2 0xFE8 ADD MSTORE PUSH1 0x0 PUSH2 0xFC7 ADD MSTORE PUSH1 0x0 PUSH2 0xEFC ADD MSTORE PUSH1 0x0 PUSH2 0xF52 ADD MSTORE PUSH1 0x0 PUSH2 0xF7B ADD MSTORE PUSH2 0x27D9 PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH2 0x10B JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x70A08231 GT PUSH2 0xA2 JUMPI DUP1 PUSH4 0xA0712D68 GT PUSH2 0x71 JUMPI DUP1 PUSH4 0xA0712D68 EQ PUSH2 0x2CE JUMPI DUP1 PUSH4 0xA457C2D7 EQ PUSH2 0x2EA JUMPI DUP1 PUSH4 0xA9059CBB EQ PUSH2 0x31A JUMPI DUP1 PUSH4 0xD505ACCF EQ PUSH2 0x34A JUMPI DUP1 PUSH4 0xDD62ED3E EQ PUSH2 0x366 JUMPI PUSH2 0x10B JUMP JUMPDEST DUP1 PUSH4 0x70A08231 EQ PUSH2 0x234 JUMPI DUP1 PUSH4 0x79CC6790 EQ PUSH2 0x264 JUMPI DUP1 PUSH4 0x7ECEBE00 EQ PUSH2 0x280 JUMPI DUP1 PUSH4 0x95D89B41 EQ PUSH2 0x2B0 JUMPI PUSH2 0x10B JUMP JUMPDEST DUP1 PUSH4 0x313CE567 GT PUSH2 0xDE JUMPI DUP1 PUSH4 0x313CE567 EQ PUSH2 0x1AC JUMPI DUP1 PUSH4 0x3644E515 EQ PUSH2 0x1CA JUMPI DUP1 PUSH4 0x39509351 EQ PUSH2 0x1E8 JUMPI DUP1 PUSH4 0x42966C68 EQ PUSH2 0x218 JUMPI PUSH2 0x10B JUMP JUMPDEST DUP1 PUSH4 0x6FDDE03 EQ PUSH2 0x110 JUMPI DUP1 PUSH4 0x95EA7B3 EQ PUSH2 0x12E JUMPI DUP1 PUSH4 0x18160DDD EQ PUSH2 0x15E JUMPI DUP1 PUSH4 0x23B872DD EQ PUSH2 0x17C JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH2 0x118 PUSH2 0x396 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x125 SWAP2 SWAP1 PUSH2 0x1E03 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x148 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x143 SWAP2 SWAP1 PUSH2 0x191F JUMP JUMPDEST PUSH2 0x428 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x155 SWAP2 SWAP1 PUSH2 0x1CD4 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x166 PUSH2 0x446 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x173 SWAP2 SWAP1 PUSH2 0x2045 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x196 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x191 SWAP2 SWAP1 PUSH2 0x182A JUMP JUMPDEST PUSH2 0x450 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x1A3 SWAP2 SWAP1 PUSH2 0x1CD4 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x1B4 PUSH2 0x548 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x1C1 SWAP2 SWAP1 PUSH2 0x2060 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x1D2 PUSH2 0x551 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x1DF SWAP2 SWAP1 PUSH2 0x1CEF JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x202 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x1FD SWAP2 SWAP1 PUSH2 0x191F JUMP JUMPDEST PUSH2 0x560 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x20F SWAP2 SWAP1 PUSH2 0x1CD4 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x232 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x22D SWAP2 SWAP1 PUSH2 0x195F JUMP JUMPDEST PUSH2 0x60C JUMP JUMPDEST STOP JUMPDEST PUSH2 0x24E PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x249 SWAP2 SWAP1 PUSH2 0x17BD JUMP JUMPDEST PUSH2 0x620 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x25B SWAP2 SWAP1 PUSH2 0x2045 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x27E PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x279 SWAP2 SWAP1 PUSH2 0x191F JUMP JUMPDEST PUSH2 0x668 JUMP JUMPDEST STOP JUMPDEST PUSH2 0x29A PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x295 SWAP2 SWAP1 PUSH2 0x17BD JUMP JUMPDEST PUSH2 0x6E3 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x2A7 SWAP2 SWAP1 PUSH2 0x2045 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x2B8 PUSH2 0x733 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x2C5 SWAP2 SWAP1 PUSH2 0x1E03 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x2E8 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x2E3 SWAP2 SWAP1 PUSH2 0x195F JUMP JUMPDEST PUSH2 0x7C5 JUMP JUMPDEST STOP JUMPDEST PUSH2 0x304 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x2FF SWAP2 SWAP1 PUSH2 0x191F JUMP JUMPDEST PUSH2 0x7D2 JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x311 SWAP2 SWAP1 PUSH2 0x1CD4 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x334 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x32F SWAP2 SWAP1 PUSH2 0x191F JUMP JUMPDEST PUSH2 0x8BD JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x341 SWAP2 SWAP1 PUSH2 0x1CD4 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH2 0x364 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x35F SWAP2 SWAP1 PUSH2 0x187D JUMP JUMPDEST PUSH2 0x8DB JUMP JUMPDEST STOP JUMPDEST PUSH2 0x380 PUSH1 0x4 DUP1 CALLDATASIZE SUB DUP2 ADD SWAP1 PUSH2 0x37B SWAP2 SWAP1 PUSH2 0x17EA JUMP JUMPDEST PUSH2 0xA1D JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH2 0x38D SWAP2 SWAP1 PUSH2 0x2045 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x60 PUSH1 0x3 DUP1 SLOAD PUSH2 0x3A5 SWAP1 PUSH2 0x21BE JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x3D1 SWAP1 PUSH2 0x21BE JUMP JUMPDEST DUP1 ISZERO PUSH2 0x41E JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x3F3 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x41E JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x401 JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x43C PUSH2 0x435 PUSH2 0xAA4 JUMP JUMPDEST DUP5 DUP5 PUSH2 0xAAC JUMP JUMPDEST PUSH1 0x1 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 SLOAD SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x45D DUP5 DUP5 DUP5 PUSH2 0xC77 JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x0 DUP7 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 PUSH2 0x4A8 PUSH2 0xAA4 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP DUP3 DUP2 LT ISZERO PUSH2 0x528 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x51F SWAP1 PUSH2 0x1F65 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x53C DUP6 PUSH2 0x534 PUSH2 0xAA4 JUMP JUMPDEST DUP6 DUP5 SUB PUSH2 0xAAC JUMP JUMPDEST PUSH1 0x1 SWAP2 POP POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x12 SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x55B PUSH2 0xEF8 JUMP JUMPDEST SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH2 0x602 PUSH2 0x56D PUSH2 0xAA4 JUMP JUMPDEST DUP5 DUP5 PUSH1 0x1 PUSH1 0x0 PUSH2 0x57B PUSH2 0xAA4 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP9 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD PUSH2 0x5FD SWAP2 SWAP1 PUSH2 0x20A2 JUMP JUMPDEST PUSH2 0xAAC JUMP JUMPDEST PUSH1 0x1 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0x61D PUSH2 0x617 PUSH2 0xAA4 JUMP JUMPDEST DUP3 PUSH2 0x1012 JUMP JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x67B DUP4 PUSH2 0x676 PUSH2 0xAA4 JUMP JUMPDEST PUSH2 0xA1D JUMP JUMPDEST SWAP1 POP DUP2 DUP2 LT ISZERO PUSH2 0x6C0 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x6B7 SWAP1 PUSH2 0x1F85 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x6D4 DUP4 PUSH2 0x6CC PUSH2 0xAA4 JUMP JUMPDEST DUP5 DUP5 SUB PUSH2 0xAAC JUMP JUMPDEST PUSH2 0x6DE DUP4 DUP4 PUSH2 0x1012 JUMP JUMPDEST POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x72C PUSH1 0x5 PUSH1 0x0 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH2 0x11E9 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x60 PUSH1 0x4 DUP1 SLOAD PUSH2 0x742 SWAP1 PUSH2 0x21BE JUMP JUMPDEST DUP1 PUSH1 0x1F ADD PUSH1 0x20 DUP1 SWAP2 DIV MUL PUSH1 0x20 ADD PUSH1 0x40 MLOAD SWAP1 DUP2 ADD PUSH1 0x40 MSTORE DUP1 SWAP3 SWAP2 SWAP1 DUP2 DUP2 MSTORE PUSH1 0x20 ADD DUP3 DUP1 SLOAD PUSH2 0x76E SWAP1 PUSH2 0x21BE JUMP JUMPDEST DUP1 ISZERO PUSH2 0x7BB JUMPI DUP1 PUSH1 0x1F LT PUSH2 0x790 JUMPI PUSH2 0x100 DUP1 DUP4 SLOAD DIV MUL DUP4 MSTORE SWAP2 PUSH1 0x20 ADD SWAP2 PUSH2 0x7BB JUMP JUMPDEST DUP3 ADD SWAP2 SWAP1 PUSH1 0x0 MSTORE PUSH1 0x20 PUSH1 0x0 KECCAK256 SWAP1 JUMPDEST DUP2 SLOAD DUP2 MSTORE SWAP1 PUSH1 0x1 ADD SWAP1 PUSH1 0x20 ADD DUP1 DUP4 GT PUSH2 0x79E JUMPI DUP3 SWAP1 SUB PUSH1 0x1F AND DUP3 ADD SWAP2 JUMPDEST POP POP POP POP POP SWAP1 POP SWAP1 JUMP JUMPDEST PUSH2 0x7CF CALLER DUP3 PUSH2 0x11F7 JUMP JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x1 PUSH1 0x0 PUSH2 0x7E1 PUSH2 0xAA4 JUMP JUMPDEST PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP DUP3 DUP2 LT ISZERO PUSH2 0x89E JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x895 SWAP1 PUSH2 0x2005 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x8B2 PUSH2 0x8A9 PUSH2 0xAA4 JUMP JUMPDEST DUP6 DUP6 DUP5 SUB PUSH2 0xAAC JUMP JUMPDEST PUSH1 0x1 SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x8D1 PUSH2 0x8CA PUSH2 0xAA4 JUMP JUMPDEST DUP5 DUP5 PUSH2 0xC77 JUMP JUMPDEST PUSH1 0x1 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST DUP4 TIMESTAMP GT ISZERO PUSH2 0x91E JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x915 SWAP1 PUSH2 0x1EC5 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH32 0x0 DUP9 DUP9 DUP9 PUSH2 0x94D DUP13 PUSH2 0x1357 JUMP JUMPDEST DUP10 PUSH1 0x40 MLOAD PUSH1 0x20 ADD PUSH2 0x963 SWAP7 SWAP6 SWAP5 SWAP4 SWAP3 SWAP2 SWAP1 PUSH2 0x1D0A JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x20 DUP2 DUP4 SUB SUB DUP2 MSTORE SWAP1 PUSH1 0x40 MSTORE DUP1 MLOAD SWAP1 PUSH1 0x20 ADD KECCAK256 SWAP1 POP PUSH1 0x0 PUSH2 0x986 DUP3 PUSH2 0x13B5 JUMP JUMPDEST SWAP1 POP PUSH1 0x0 PUSH2 0x996 DUP3 DUP8 DUP8 DUP8 PUSH2 0x13CF JUMP JUMPDEST SWAP1 POP DUP10 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ PUSH2 0xA06 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x9FD SWAP1 PUSH2 0x1F45 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0xA11 DUP11 DUP11 DUP11 PUSH2 0xAAC JUMP JUMPDEST POP POP POP POP POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 PUSH1 0x0 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 CALLER SWAP1 POP SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0xB1C JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xB13 SWAP1 PUSH2 0x1FE5 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0xB8C JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xB83 SWAP1 PUSH2 0x1EA5 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP1 PUSH1 0x1 PUSH1 0x0 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0x8C5BE1E5EBEC7D5BD14F71427D1E84F3DD0314C0F7B2291E5B200AC8C7C3B925 DUP4 PUSH1 0x40 MLOAD PUSH2 0xC6A SWAP2 SWAP1 PUSH2 0x2045 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0xCE7 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xCDE SWAP1 PUSH2 0x1FC5 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0xD57 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xD4E SWAP1 PUSH2 0x1E45 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0xD62 DUP4 DUP4 DUP4 PUSH2 0x13FA JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP DUP2 DUP2 LT ISZERO PUSH2 0xDE8 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0xDDF SWAP1 PUSH2 0x1EE5 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP2 DUP2 SUB PUSH1 0x0 DUP1 DUP7 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP DUP2 PUSH1 0x0 DUP1 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0xE7B SWAP2 SWAP1 PUSH2 0x20A2 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF DUP5 PUSH1 0x40 MLOAD PUSH2 0xEDF SWAP2 SWAP1 PUSH2 0x2045 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 PUSH2 0xEF2 DUP5 DUP5 DUP5 PUSH2 0x13FF JUMP JUMPDEST POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH32 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND ADDRESS PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ DUP1 ISZERO PUSH2 0xF74 JUMPI POP PUSH32 0x0 CHAINID EQ JUMPDEST ISZERO PUSH2 0xFA1 JUMPI PUSH32 0x0 SWAP1 POP PUSH2 0x100F JUMP JUMPDEST PUSH2 0x100C PUSH32 0x0 PUSH32 0x0 PUSH32 0x0 PUSH2 0x1404 JUMP JUMPDEST SWAP1 POP JUMPDEST SWAP1 JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0x1082 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x1079 SWAP1 PUSH2 0x1FA5 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x108E DUP3 PUSH1 0x0 DUP4 PUSH2 0x13FA JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SLOAD SWAP1 POP DUP2 DUP2 LT ISZERO PUSH2 0x1114 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x110B SWAP1 PUSH2 0x1E65 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST DUP2 DUP2 SUB PUSH1 0x0 DUP1 DUP6 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 DUP2 SWAP1 SSTORE POP DUP2 PUSH1 0x2 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x116B SWAP2 SWAP1 PUSH2 0x20F8 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP4 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF DUP5 PUSH1 0x40 MLOAD PUSH2 0x11D0 SWAP2 SWAP1 PUSH2 0x2045 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 PUSH2 0x11E4 DUP4 PUSH1 0x0 DUP5 PUSH2 0x13FF JUMP JUMPDEST POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 PUSH1 0x0 ADD SLOAD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP3 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0x1267 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x125E SWAP1 PUSH2 0x2025 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH2 0x1273 PUSH1 0x0 DUP4 DUP4 PUSH2 0x13FA JUMP JUMPDEST DUP1 PUSH1 0x2 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x1285 SWAP2 SWAP1 PUSH2 0x20A2 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP DUP1 PUSH1 0x0 DUP1 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 PUSH1 0x0 DUP3 DUP3 SLOAD PUSH2 0x12DA SWAP2 SWAP1 PUSH2 0x20A2 JUMP JUMPDEST SWAP3 POP POP DUP2 SWAP1 SSTORE POP DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH32 0xDDF252AD1BE2C89B69C2B068FC378DAA952BA7F163C4A11628F55A4DF523B3EF DUP4 PUSH1 0x40 MLOAD PUSH2 0x133F SWAP2 SWAP1 PUSH2 0x2045 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 LOG3 PUSH2 0x1353 PUSH1 0x0 DUP4 DUP4 PUSH2 0x13FF JUMP JUMPDEST POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x5 PUSH1 0x0 DUP5 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 MSTORE PUSH1 0x20 ADD SWAP1 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x0 KECCAK256 SWAP1 POP PUSH2 0x13A4 DUP2 PUSH2 0x11E9 JUMP JUMPDEST SWAP2 POP PUSH2 0x13AF DUP2 PUSH2 0x143E JUMP JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x13C8 PUSH2 0x13C2 PUSH2 0xEF8 JUMP JUMPDEST DUP4 PUSH2 0x1454 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 PUSH2 0x13E0 DUP8 DUP8 DUP8 DUP8 PUSH2 0x1487 JUMP JUMPDEST SWAP2 POP SWAP2 POP PUSH2 0x13ED DUP2 PUSH2 0x1594 JUMP JUMPDEST DUP2 SWAP3 POP POP POP SWAP5 SWAP4 POP POP POP POP JUMP JUMPDEST POP POP POP JUMP JUMPDEST POP POP POP JUMP JUMPDEST PUSH1 0x0 DUP4 DUP4 DUP4 CHAINID ADDRESS PUSH1 0x40 MLOAD PUSH1 0x20 ADD PUSH2 0x141F SWAP6 SWAP5 SWAP4 SWAP3 SWAP2 SWAP1 PUSH2 0x1D6B JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x20 DUP2 DUP4 SUB SUB DUP2 MSTORE SWAP1 PUSH1 0x40 MSTORE DUP1 MLOAD SWAP1 PUSH1 0x20 ADD KECCAK256 SWAP1 POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x1 DUP2 PUSH1 0x0 ADD PUSH1 0x0 DUP3 DUP3 SLOAD ADD SWAP3 POP POP DUP2 SWAP1 SSTORE POP POP JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 PUSH1 0x40 MLOAD PUSH1 0x20 ADD PUSH2 0x1469 SWAP3 SWAP2 SWAP1 PUSH2 0x1C9D JUMP JUMPDEST PUSH1 0x40 MLOAD PUSH1 0x20 DUP2 DUP4 SUB SUB DUP2 MSTORE SWAP1 PUSH1 0x40 MSTORE DUP1 MLOAD SWAP1 PUSH1 0x20 ADD KECCAK256 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH32 0x7FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF5D576E7357A4501DDFE92F46681B20A0 DUP4 PUSH1 0x0 SHR GT ISZERO PUSH2 0x14C2 JUMPI PUSH1 0x0 PUSH1 0x3 SWAP2 POP SWAP2 POP PUSH2 0x158B JUMP JUMPDEST PUSH1 0x1B DUP6 PUSH1 0xFF AND EQ ISZERO DUP1 ISZERO PUSH2 0x14DA JUMPI POP PUSH1 0x1C DUP6 PUSH1 0xFF AND EQ ISZERO JUMPDEST ISZERO PUSH2 0x14EC JUMPI PUSH1 0x0 PUSH1 0x4 SWAP2 POP SWAP2 POP PUSH2 0x158B JUMP JUMPDEST PUSH1 0x0 PUSH1 0x1 DUP8 DUP8 DUP8 DUP8 PUSH1 0x40 MLOAD PUSH1 0x0 DUP2 MSTORE PUSH1 0x20 ADD PUSH1 0x40 MSTORE PUSH1 0x40 MLOAD PUSH2 0x1511 SWAP5 SWAP4 SWAP3 SWAP2 SWAP1 PUSH2 0x1DBE JUMP JUMPDEST PUSH1 0x20 PUSH1 0x40 MLOAD PUSH1 0x20 DUP2 SUB SWAP1 DUP1 DUP5 SUB SWAP1 DUP6 GAS STATICCALL ISZERO DUP1 ISZERO PUSH2 0x1533 JUMPI RETURNDATASIZE PUSH1 0x0 DUP1 RETURNDATACOPY RETURNDATASIZE PUSH1 0x0 REVERT JUMPDEST POP POP POP PUSH1 0x20 PUSH1 0x40 MLOAD SUB MLOAD SWAP1 POP PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND DUP2 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF AND EQ ISZERO PUSH2 0x1582 JUMPI PUSH1 0x0 PUSH1 0x1 SWAP3 POP SWAP3 POP POP PUSH2 0x158B JUMP JUMPDEST DUP1 PUSH1 0x0 SWAP3 POP SWAP3 POP POP JUMPDEST SWAP5 POP SWAP5 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x4 DUP2 GT ISZERO PUSH2 0x15A8 JUMPI PUSH2 0x15A7 PUSH2 0x2229 JUMP JUMPDEST JUMPDEST DUP2 PUSH1 0x4 DUP2 GT ISZERO PUSH2 0x15BB JUMPI PUSH2 0x15BA PUSH2 0x2229 JUMP JUMPDEST JUMPDEST EQ ISZERO PUSH2 0x15C6 JUMPI PUSH2 0x1766 JUMP JUMPDEST PUSH1 0x1 PUSH1 0x4 DUP2 GT ISZERO PUSH2 0x15DA JUMPI PUSH2 0x15D9 PUSH2 0x2229 JUMP JUMPDEST JUMPDEST DUP2 PUSH1 0x4 DUP2 GT ISZERO PUSH2 0x15ED JUMPI PUSH2 0x15EC PUSH2 0x2229 JUMP JUMPDEST JUMPDEST EQ ISZERO PUSH2 0x162E JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x1625 SWAP1 PUSH2 0x1E25 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x2 PUSH1 0x4 DUP2 GT ISZERO PUSH2 0x1642 JUMPI PUSH2 0x1641 PUSH2 0x2229 JUMP JUMPDEST JUMPDEST DUP2 PUSH1 0x4 DUP2 GT ISZERO PUSH2 0x1655 JUMPI PUSH2 0x1654 PUSH2 0x2229 JUMP JUMPDEST JUMPDEST EQ ISZERO PUSH2 0x1696 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x168D SWAP1 PUSH2 0x1E85 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x3 PUSH1 0x4 DUP2 GT ISZERO PUSH2 0x16AA JUMPI PUSH2 0x16A9 PUSH2 0x2229 JUMP JUMPDEST JUMPDEST DUP2 PUSH1 0x4 DUP2 GT ISZERO PUSH2 0x16BD JUMPI PUSH2 0x16BC PUSH2 0x2229 JUMP JUMPDEST JUMPDEST EQ ISZERO PUSH2 0x16FE JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x16F5 SWAP1 PUSH2 0x1F05 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST PUSH1 0x4 DUP1 DUP2 GT ISZERO PUSH2 0x1711 JUMPI PUSH2 0x1710 PUSH2 0x2229 JUMP JUMPDEST JUMPDEST DUP2 PUSH1 0x4 DUP2 GT ISZERO PUSH2 0x1724 JUMPI PUSH2 0x1723 PUSH2 0x2229 JUMP JUMPDEST JUMPDEST EQ ISZERO PUSH2 0x1765 JUMPI PUSH1 0x40 MLOAD PUSH32 0x8C379A000000000000000000000000000000000000000000000000000000000 DUP2 MSTORE PUSH1 0x4 ADD PUSH2 0x175C SWAP1 PUSH2 0x1F25 JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 REVERT JUMPDEST JUMPDEST POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0x1778 DUP2 PUSH2 0x2747 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0x178D DUP2 PUSH2 0x275E JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0x17A2 DUP2 PUSH2 0x2775 JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 CALLDATALOAD SWAP1 POP PUSH2 0x17B7 DUP2 PUSH2 0x278C JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x17D3 JUMPI PUSH2 0x17D2 PUSH2 0x2287 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x17E1 DUP5 DUP3 DUP6 ADD PUSH2 0x1769 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x1801 JUMPI PUSH2 0x1800 PUSH2 0x2287 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x180F DUP6 DUP3 DUP7 ADD PUSH2 0x1769 JUMP JUMPDEST SWAP3 POP POP PUSH1 0x20 PUSH2 0x1820 DUP6 DUP3 DUP7 ADD PUSH2 0x1769 JUMP JUMPDEST SWAP2 POP POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 PUSH1 0x60 DUP5 DUP7 SUB SLT ISZERO PUSH2 0x1843 JUMPI PUSH2 0x1842 PUSH2 0x2287 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1851 DUP7 DUP3 DUP8 ADD PUSH2 0x1769 JUMP JUMPDEST SWAP4 POP POP PUSH1 0x20 PUSH2 0x1862 DUP7 DUP3 DUP8 ADD PUSH2 0x1769 JUMP JUMPDEST SWAP3 POP POP PUSH1 0x40 PUSH2 0x1873 DUP7 DUP3 DUP8 ADD PUSH2 0x1793 JUMP JUMPDEST SWAP2 POP POP SWAP3 POP SWAP3 POP SWAP3 JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x0 DUP1 PUSH1 0x0 DUP1 PUSH1 0x0 PUSH1 0xE0 DUP9 DUP11 SUB SLT ISZERO PUSH2 0x189C JUMPI PUSH2 0x189B PUSH2 0x2287 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x18AA DUP11 DUP3 DUP12 ADD PUSH2 0x1769 JUMP JUMPDEST SWAP8 POP POP PUSH1 0x20 PUSH2 0x18BB DUP11 DUP3 DUP12 ADD PUSH2 0x1769 JUMP JUMPDEST SWAP7 POP POP PUSH1 0x40 PUSH2 0x18CC DUP11 DUP3 DUP12 ADD PUSH2 0x1793 JUMP JUMPDEST SWAP6 POP POP PUSH1 0x60 PUSH2 0x18DD DUP11 DUP3 DUP12 ADD PUSH2 0x1793 JUMP JUMPDEST SWAP5 POP POP PUSH1 0x80 PUSH2 0x18EE DUP11 DUP3 DUP12 ADD PUSH2 0x17A8 JUMP JUMPDEST SWAP4 POP POP PUSH1 0xA0 PUSH2 0x18FF DUP11 DUP3 DUP12 ADD PUSH2 0x177E JUMP JUMPDEST SWAP3 POP POP PUSH1 0xC0 PUSH2 0x1910 DUP11 DUP3 DUP12 ADD PUSH2 0x177E JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP6 SWAP9 SWAP2 SWAP5 SWAP8 POP SWAP3 SWAP6 POP JUMP JUMPDEST PUSH1 0x0 DUP1 PUSH1 0x40 DUP4 DUP6 SUB SLT ISZERO PUSH2 0x1936 JUMPI PUSH2 0x1935 PUSH2 0x2287 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1944 DUP6 DUP3 DUP7 ADD PUSH2 0x1769 JUMP JUMPDEST SWAP3 POP POP PUSH1 0x20 PUSH2 0x1955 DUP6 DUP3 DUP7 ADD PUSH2 0x1793 JUMP JUMPDEST SWAP2 POP POP SWAP3 POP SWAP3 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 DUP5 SUB SLT ISZERO PUSH2 0x1975 JUMPI PUSH2 0x1974 PUSH2 0x2287 JUMP JUMPDEST JUMPDEST PUSH1 0x0 PUSH2 0x1983 DUP5 DUP3 DUP6 ADD PUSH2 0x1793 JUMP JUMPDEST SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH2 0x1995 DUP2 PUSH2 0x212C JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH2 0x19A4 DUP2 PUSH2 0x213E JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH2 0x19B3 DUP2 PUSH2 0x214A JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH2 0x19CA PUSH2 0x19C5 DUP3 PUSH2 0x214A JUMP JUMPDEST PUSH2 0x21F0 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x19DB DUP3 PUSH2 0x207B JUMP JUMPDEST PUSH2 0x19E5 DUP2 DUP6 PUSH2 0x2086 JUMP JUMPDEST SWAP4 POP PUSH2 0x19F5 DUP2 DUP6 PUSH1 0x20 DUP7 ADD PUSH2 0x218B JUMP JUMPDEST PUSH2 0x19FE DUP2 PUSH2 0x228C JUMP JUMPDEST DUP5 ADD SWAP2 POP POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1A16 PUSH1 0x18 DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1A21 DUP3 PUSH2 0x229D JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1A39 PUSH1 0x23 DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1A44 DUP3 PUSH2 0x22C6 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1A5C PUSH1 0x22 DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1A67 DUP3 PUSH2 0x2315 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1A7F PUSH1 0x1F DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1A8A DUP3 PUSH2 0x2364 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1AA2 PUSH1 0x22 DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1AAD DUP3 PUSH2 0x238D JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1AC5 PUSH1 0x2 DUP4 PUSH2 0x2097 JUMP JUMPDEST SWAP2 POP PUSH2 0x1AD0 DUP3 PUSH2 0x23DC JUMP JUMPDEST PUSH1 0x2 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1AE8 PUSH1 0x1D DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1AF3 DUP3 PUSH2 0x2405 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1B0B PUSH1 0x26 DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1B16 DUP3 PUSH2 0x242E JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1B2E PUSH1 0x22 DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1B39 DUP3 PUSH2 0x247D JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1B51 PUSH1 0x22 DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1B5C DUP3 PUSH2 0x24CC JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1B74 PUSH1 0x1E DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1B7F DUP3 PUSH2 0x251B JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1B97 PUSH1 0x28 DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1BA2 DUP3 PUSH2 0x2544 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1BBA PUSH1 0x24 DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1BC5 DUP3 PUSH2 0x2593 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1BDD PUSH1 0x21 DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1BE8 DUP3 PUSH2 0x25E2 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1C00 PUSH1 0x25 DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1C0B DUP3 PUSH2 0x2631 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1C23 PUSH1 0x24 DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1C2E DUP3 PUSH2 0x2680 JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1C46 PUSH1 0x25 DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1C51 DUP3 PUSH2 0x26CF JUMP JUMPDEST PUSH1 0x40 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1C69 PUSH1 0x1F DUP4 PUSH2 0x2086 JUMP JUMPDEST SWAP2 POP PUSH2 0x1C74 DUP3 PUSH2 0x271E JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH2 0x1C88 DUP2 PUSH2 0x2174 JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH2 0x1C97 DUP2 PUSH2 0x217E JUMP JUMPDEST DUP3 MSTORE POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x1CA8 DUP3 PUSH2 0x1AB8 JUMP JUMPDEST SWAP2 POP PUSH2 0x1CB4 DUP3 DUP6 PUSH2 0x19B9 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP2 POP PUSH2 0x1CC4 DUP3 DUP5 PUSH2 0x19B9 JUMP JUMPDEST PUSH1 0x20 DUP3 ADD SWAP2 POP DUP2 SWAP1 POP SWAP4 SWAP3 POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0x1CE9 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0x199B JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0x1D04 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0x19AA JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0xC0 DUP3 ADD SWAP1 POP PUSH2 0x1D1F PUSH1 0x0 DUP4 ADD DUP10 PUSH2 0x19AA JUMP JUMPDEST PUSH2 0x1D2C PUSH1 0x20 DUP4 ADD DUP9 PUSH2 0x198C JUMP JUMPDEST PUSH2 0x1D39 PUSH1 0x40 DUP4 ADD DUP8 PUSH2 0x198C JUMP JUMPDEST PUSH2 0x1D46 PUSH1 0x60 DUP4 ADD DUP7 PUSH2 0x1C7F JUMP JUMPDEST PUSH2 0x1D53 PUSH1 0x80 DUP4 ADD DUP6 PUSH2 0x1C7F JUMP JUMPDEST PUSH2 0x1D60 PUSH1 0xA0 DUP4 ADD DUP5 PUSH2 0x1C7F JUMP JUMPDEST SWAP8 SWAP7 POP POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0xA0 DUP3 ADD SWAP1 POP PUSH2 0x1D80 PUSH1 0x0 DUP4 ADD DUP9 PUSH2 0x19AA JUMP JUMPDEST PUSH2 0x1D8D PUSH1 0x20 DUP4 ADD DUP8 PUSH2 0x19AA JUMP JUMPDEST PUSH2 0x1D9A PUSH1 0x40 DUP4 ADD DUP7 PUSH2 0x19AA JUMP JUMPDEST PUSH2 0x1DA7 PUSH1 0x60 DUP4 ADD DUP6 PUSH2 0x1C7F JUMP JUMPDEST PUSH2 0x1DB4 PUSH1 0x80 DUP4 ADD DUP5 PUSH2 0x198C JUMP JUMPDEST SWAP7 SWAP6 POP POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x80 DUP3 ADD SWAP1 POP PUSH2 0x1DD3 PUSH1 0x0 DUP4 ADD DUP8 PUSH2 0x19AA JUMP JUMPDEST PUSH2 0x1DE0 PUSH1 0x20 DUP4 ADD DUP7 PUSH2 0x1C8E JUMP JUMPDEST PUSH2 0x1DED PUSH1 0x40 DUP4 ADD DUP6 PUSH2 0x19AA JUMP JUMPDEST PUSH2 0x1DFA PUSH1 0x60 DUP4 ADD DUP5 PUSH2 0x19AA JUMP JUMPDEST SWAP6 SWAP5 POP POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1E1D DUP2 DUP5 PUSH2 0x19D0 JUMP JUMPDEST SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1E3E DUP2 PUSH2 0x1A09 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1E5E DUP2 PUSH2 0x1A2C JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1E7E DUP2 PUSH2 0x1A4F JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1E9E DUP2 PUSH2 0x1A72 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1EBE DUP2 PUSH2 0x1A95 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1EDE DUP2 PUSH2 0x1ADB JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1EFE DUP2 PUSH2 0x1AFE JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1F1E DUP2 PUSH2 0x1B21 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1F3E DUP2 PUSH2 0x1B44 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1F5E DUP2 PUSH2 0x1B67 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1F7E DUP2 PUSH2 0x1B8A JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1F9E DUP2 PUSH2 0x1BAD JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1FBE DUP2 PUSH2 0x1BD0 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1FDE DUP2 PUSH2 0x1BF3 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x1FFE DUP2 PUSH2 0x1C16 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x201E DUP2 PUSH2 0x1C39 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP DUP2 DUP2 SUB PUSH1 0x0 DUP4 ADD MSTORE PUSH2 0x203E DUP2 PUSH2 0x1C5C JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0x205A PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0x1C7F JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x20 DUP3 ADD SWAP1 POP PUSH2 0x2075 PUSH1 0x0 DUP4 ADD DUP5 PUSH2 0x1C8E JUMP JUMPDEST SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 MLOAD SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP3 DUP3 MSTORE PUSH1 0x20 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x20AD DUP3 PUSH2 0x2174 JUMP JUMPDEST SWAP2 POP PUSH2 0x20B8 DUP4 PUSH2 0x2174 JUMP JUMPDEST SWAP3 POP DUP3 PUSH32 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF SUB DUP3 GT ISZERO PUSH2 0x20ED JUMPI PUSH2 0x20EC PUSH2 0x21FA JUMP JUMPDEST JUMPDEST DUP3 DUP3 ADD SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x2103 DUP3 PUSH2 0x2174 JUMP JUMPDEST SWAP2 POP PUSH2 0x210E DUP4 PUSH2 0x2174 JUMP JUMPDEST SWAP3 POP DUP3 DUP3 LT ISZERO PUSH2 0x2121 JUMPI PUSH2 0x2120 PUSH2 0x21FA JUMP JUMPDEST JUMPDEST DUP3 DUP3 SUB SWAP1 POP SWAP3 SWAP2 POP POP JUMP JUMPDEST PUSH1 0x0 PUSH2 0x2137 DUP3 PUSH2 0x2154 JUMP JUMPDEST SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 ISZERO ISZERO SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH20 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF DUP3 AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0xFF DUP3 AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH2 0x21A9 JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH2 0x218E JUMP JUMPDEST DUP4 DUP2 GT ISZERO PUSH2 0x21B8 JUMPI PUSH1 0x0 DUP5 DUP5 ADD MSTORE JUMPDEST POP POP POP POP JUMP JUMPDEST PUSH1 0x0 PUSH1 0x2 DUP3 DIV SWAP1 POP PUSH1 0x1 DUP3 AND DUP1 PUSH2 0x21D6 JUMPI PUSH1 0x7F DUP3 AND SWAP2 POP JUMPDEST PUSH1 0x20 DUP3 LT DUP2 EQ ISZERO PUSH2 0x21EA JUMPI PUSH2 0x21E9 PUSH2 0x2258 JUMP JUMPDEST JUMPDEST POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH1 0x0 DUP2 SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x11 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x21 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH32 0x4E487B7100000000000000000000000000000000000000000000000000000000 PUSH1 0x0 MSTORE PUSH1 0x22 PUSH1 0x4 MSTORE PUSH1 0x24 PUSH1 0x0 REVERT JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x0 PUSH1 0x1F NOT PUSH1 0x1F DUP4 ADD AND SWAP1 POP SWAP2 SWAP1 POP JUMP JUMPDEST PUSH32 0x45434453413A20696E76616C6964207369676E61747572650000000000000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A207472616E7366657220746F20746865207A65726F2061646472 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x6573730000000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A206275726E20616D6F756E7420657863656564732062616C616E PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x6365000000000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45434453413A20696E76616C6964207369676E6174757265206C656E67746800 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A20617070726F766520746F20746865207A65726F206164647265 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x7373000000000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x1901000000000000000000000000000000000000000000000000000000000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332305065726D69743A206578706972656420646561646C696E65000000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A207472616E7366657220616D6F756E7420657863656564732062 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x616C616E63650000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45434453413A20696E76616C6964207369676E6174757265202773272076616C PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x7565000000000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45434453413A20696E76616C6964207369676E6174757265202776272076616C PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x7565000000000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332305065726D69743A20696E76616C6964207369676E61747572650000 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A207472616E7366657220616D6F756E7420657863656564732061 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x6C6C6F77616E6365000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A206275726E20616D6F756E74206578636565647320616C6C6F77 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x616E636500000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A206275726E2066726F6D20746865207A65726F20616464726573 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x7300000000000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A207472616E736665722066726F6D20746865207A65726F206164 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x6472657373000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A20617070726F76652066726F6D20746865207A65726F20616464 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x7265737300000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A2064656372656173656420616C6C6F77616E63652062656C6F77 PUSH1 0x0 DUP3 ADD MSTORE PUSH32 0x207A65726F000000000000000000000000000000000000000000000000000000 PUSH1 0x20 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH32 0x45524332303A206D696E7420746F20746865207A65726F206164647265737300 PUSH1 0x0 DUP3 ADD MSTORE POP JUMP JUMPDEST PUSH2 0x2750 DUP2 PUSH2 0x212C JUMP JUMPDEST DUP2 EQ PUSH2 0x275B JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH2 0x2767 DUP2 PUSH2 0x214A JUMP JUMPDEST DUP2 EQ PUSH2 0x2772 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH2 0x277E DUP2 PUSH2 0x2174 JUMP JUMPDEST DUP2 EQ PUSH2 0x2789 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP JUMPDEST PUSH2 0x2795 DUP2 PUSH2 0x217E JUMP JUMPDEST DUP2 EQ PUSH2 0x27A0 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP JUMP INVALID LOG2 PUSH5 0x6970667358 0x22 SLT KECCAK256 STATICCALL 0xDB 0x24 DUP2 0xA8 SUB 0x2A PUSH29 0x6D6ADA9C67BCDC16C0C2C938B97DD45FCCAFE6327B7488F564736F6C63 NUMBER STOP ADDMOD SMOD STOP CALLER ",
      "sourceMap": "40015:275:0:-:0;;;36825:95;36772:148;;;;;40077:124;;;;;;;;;;37152:52;;;;;;;;;;;;;;;;;37191:4;15372:602;;;;;;;;;;;;;;;;;26000:113;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;26074:5;26066;:13;;;;;;;;;;;;:::i;:::-;;26099:7;26089;:17;;;;;;;;;;;;:::i;:::-;;26000:113;;15437:18;15474:4;15458:22;;;;;;15437:43;;15490:21;15530:7;15514:25;;;;;;15490:49;;15549:16;15568:117;15549:136;;15710:10;15695:25;;;;;;15748:13;15730:31;;;;;;15790:13;15771:32;;;;;;15840:58;15862:8;15872:10;15884:13;15840:21;;;:58;;:::i;:::-;15813:85;;;;;;15931:4;15908:28;;;;;;;;;;;;15959:8;15946:21;;;;;;15427:547;;;15372:602;;37152:52;40149:45:::2;40155:10;40183;:8;;;:10;;:::i;:::-;40177:2;:16;;;;:::i;:::-;40167:7;:26;;;;:::i;:::-;40149:5;;;:45;;:::i;:::-;40015:275:::0;;16374:257;16514:7;16561:8;16571;16581:11;16594:13;16617:4;16550:73;;;;;;;;;;;;:::i;:::-;;;;;;;;;;;;;16540:84;;;;;;16533:91;;16374:257;;;;;:::o;27115:91::-;27173:5;27197:2;27190:9;;27115:91;:::o;32348:389::-;32450:1;32431:21;;:7;:21;;;;32423:65;;;;;;;;;;;;:::i;:::-;;;;;;;;;32499:49;32528:1;32532:7;32541:6;32499:20;;;:49;;:::i;:::-;32575:6;32559:12;;:22;;;;;;;:::i;:::-;;;;;;;;32613:6;32591:9;:18;32601:7;32591:18;;;;;;;;;;;;;;;;:28;;;;;;;:::i;:::-;;;;;;;;32655:7;32634:37;;32651:1;32634:37;;;32664:6;32634:37;;;;;;:::i;:::-;;;;;;;;32682:48;32710:1;32714:7;32723:6;32682:19;;;:48;;:::i;:::-;32348:389;;:::o;35010:121::-;;;;:::o;35719:120::-;;;;:::o;40015:275::-;;;;;;;:::i;:::-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;:::i;:::-;;;:::o;:::-;;;;;;;;;;;;;;;;;;;;;:::o;7:118:1:-;94:24;112:5;94:24;:::i;:::-;89:3;82:37;7:118;;:::o;131:::-;218:24;236:5;218:24;:::i;:::-;213:3;206:37;131:118;;:::o;255:366::-;397:3;418:67;482:2;477:3;418:67;:::i;:::-;411:74;;494:93;583:3;494:93;:::i;:::-;612:2;607:3;603:12;596:19;;255:366;;;:::o;627:118::-;714:24;732:5;714:24;:::i;:::-;709:3;702:37;627:118;;:::o;751:664::-;956:4;994:3;983:9;979:19;971:27;;1008:71;1076:1;1065:9;1061:17;1052:6;1008:71;:::i;:::-;1089:72;1157:2;1146:9;1142:18;1133:6;1089:72;:::i;:::-;1171;1239:2;1228:9;1224:18;1215:6;1171:72;:::i;:::-;1253;1321:2;1310:9;1306:18;1297:6;1253:72;:::i;:::-;1335:73;1403:3;1392:9;1388:19;1379:6;1335:73;:::i;:::-;751:664;;;;;;;;:::o;1421:419::-;1587:4;1625:2;1614:9;1610:18;1602:26;;1674:9;1668:4;1664:20;1660:1;1649:9;1645:17;1638:47;1702:131;1828:4;1702:131;:::i;:::-;1694:139;;1421:419;;;:::o;1846:222::-;1939:4;1977:2;1966:9;1962:18;1954:26;;1990:71;2058:1;2047:9;2043:17;2034:6;1990:71;:::i;:::-;1846:222;;;;:::o;2074:169::-;2158:11;2192:6;2187:3;2180:19;2232:4;2227:3;2223:14;2208:29;;2074:169;;;;:::o;2249:305::-;2289:3;2308:20;2326:1;2308:20;:::i;:::-;2303:25;;2342:20;2360:1;2342:20;:::i;:::-;2337:25;;2496:1;2428:66;2424:74;2421:1;2418:81;2415:107;;;2502:18;;:::i;:::-;2415:107;2546:1;2543;2539:9;2532:16;;2249:305;;;;:::o;2560:848::-;2621:5;2628:4;2652:6;2643:15;;2676:5;2667:14;;2690:712;2711:1;2701:8;2698:15;2690:712;;;2806:4;2801:3;2797:14;2791:4;2788:24;2785:50;;;2815:18;;:::i;:::-;2785:50;2865:1;2855:8;2851:16;2848:451;;;3280:4;3273:5;3269:16;3260:25;;2848:451;3330:4;3324;3320:15;3312:23;;3360:32;3383:8;3360:32;:::i;:::-;3348:44;;2690:712;;;2560:848;;;;;;;:::o;3414:281::-;3472:5;3496:23;3514:4;3496:23;:::i;:::-;3488:31;;3540:25;3556:8;3540:25;:::i;:::-;3528:37;;3584:104;3621:66;3611:8;3605:4;3584:104;:::i;:::-;3575:113;;3414:281;;;;:::o;3701:1073::-;3755:5;3946:8;3936:40;;3967:1;3958:10;;3969:5;;3936:40;3995:4;3985:36;;4012:1;4003:10;;4014:5;;3985:36;4081:4;4129:1;4124:27;;;;4165:1;4160:191;;;;4074:277;;4124:27;4142:1;4133:10;;4144:5;;;4160:191;4205:3;4195:8;4192:17;4189:43;;;4212:18;;:::i;:::-;4189:43;4261:8;4258:1;4254:16;4245:25;;4296:3;4289:5;4286:14;4283:40;;;4303:18;;:::i;:::-;4283:40;4336:5;;;4074:277;;4460:2;4450:8;4447:16;4441:3;4435:4;4432:13;4428:36;4410:2;4400:8;4397:16;4392:2;4386:4;4383:12;4379:35;4363:111;4360:246;;;4516:8;4510:4;4506:19;4497:28;;4551:3;4544:5;4541:14;4538:40;;;4558:18;;:::i;:::-;4538:40;4591:5;;4360:246;4631:42;4669:3;4659:8;4653:4;4650:1;4631:42;:::i;:::-;4616:57;;;;4705:4;4700:3;4696:14;4689:5;4686:25;4683:51;;;4714:18;;:::i;:::-;4683:51;4763:4;4756:5;4752:16;4743:25;;3701:1073;;;;;;:::o;4780:348::-;4820:7;4843:20;4861:1;4843:20;:::i;:::-;4838:25;;4877:20;4895:1;4877:20;:::i;:::-;4872:25;;5065:1;4997:66;4993:74;4990:1;4987:81;4982:1;4975:9;4968:17;4964:105;4961:131;;;5072:18;;:::i;:::-;4961:131;5120:1;5117;5113:9;5102:20;;4780:348;;;;:::o;5134:96::-;5171:7;5200:24;5218:5;5200:24;:::i;:::-;5189:35;;5134:96;;;:::o;5236:77::-;5273:7;5302:5;5291:16;;5236:77;;;:::o;5319:126::-;5356:7;5396:42;5389:5;5385:54;5374:65;;5319:126;;;:::o;5451:77::-;5488:7;5517:5;5506:16;;5451:77;;;:::o;5534:86::-;5569:7;5609:4;5602:5;5598:16;5587:27;;5534:86;;;:::o;5626:320::-;5670:6;5707:1;5701:4;5697:12;5687:22;;5754:1;5748:4;5744:12;5775:18;5765:81;;5831:4;5823:6;5819:17;5809:27;;5765:81;5893:2;5885:6;5882:14;5862:18;5859:38;5856:84;;;5912:18;;:::i;:::-;5856:84;5677:269;5626:320;;;:::o;5952:180::-;6000:77;5997:1;5990:88;6097:4;6094:1;6087:15;6121:4;6118:1;6111:15;6138:180;6186:77;6183:1;6176:88;6283:4;6280:1;6273:15;6307:4;6304:1;6297:15;6324:102;6366:8;6413:5;6410:1;6406:13;6385:34;;6324:102;;;:::o;6432:181::-;6572:33;6568:1;6560:6;6556:14;6549:57;6432:181;:::o;40015:275:0:-;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;"
    }
    const factory = new ContractFactory(contractAbi, contractByteCode, signer);

    // If your contract requires constructor args, you can specify them here
    const deployArgs = []
    const contract = await factory.deploy(deployArgs);
    
    console.log(contract.address);
    console.log(contract.deployTransaction);
  }

  const compile = () => {

    var input = {
      language: 'Solidity',
      sources: {
        'test.sol': {
          content: 'contract C { function f() public { } }'
        }
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['*']
          }
        }
      }
    };

    var output = JSON.parse(solc.compile(JSON.stringify(input)));

    // `output` here contains the JSON output as specified in the documentation
    for (var contractName in output.contracts['test.sol']) {
      console.log(
        contractName +
          ': ' +
          output.contracts['test.sol'][contractName].evm.bytecode.object
      );
    }
  }

  return (
    <div className={styles.container}>
      {console.log(browserSolc)}
      <main className={styles.main}>
        <W3WalletDriver />
        <button onClick={deploy}>deploy order</button>
        <button onClick={compile}>compile order</button>
      </main>
    </div>
  );
}

export default Deploy