import { Contract } from "everscale-inpage-provider";

export type ConstructorParams<Abi> = Parameters<constructorParams<Abi, Contract<Abi>["methods"]>>[0];
type constructorParams<Abi, T extends Contract<Abi>["methods"]> = {
  [key in keyof T]: key extends "constructor" ? T[key] : never;
}[keyof T];
