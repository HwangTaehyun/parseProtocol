#!/usr/bin/env node

import { XMLParser, XMLBuilder, XMLValidator } from "fast-xml-parser";
import jetpack from "fs-jetpack";
import util from "util";
import { parseProtocols } from "./parseProtocol.js";

const optionDefinitions = [
  { name: 'input', alias: 'i', type: String },
]

import commandLineArgs from 'command-line-args'
const options = commandLineArgs(optionDefinitions)
console.log(options);

const {input: inputFile} = options;

try {
    const XMLdata = jetpack.read(inputFile);
    const parser = new XMLParser();
    let philipsXML = parser.parse(XMLdata);
    const swiftMRProtocols = [];
    parseProtocols(swiftMRProtocols, philipsXML);
    console.log(swiftMRProtocols);
    console.log(swiftMRProtocols.length);
    // console.log(util.inspect(philipsXML, { depth: null }));
} catch (e) {
    console.error('Error occured');
}
