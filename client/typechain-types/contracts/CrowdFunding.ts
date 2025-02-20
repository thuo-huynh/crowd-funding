/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace CrowdFunding {
  export type CampaignStruct = {
    owner: PromiseOrValue<string>;
    title: PromiseOrValue<string>;
    description: PromiseOrValue<string>;
    target: PromiseOrValue<BigNumberish>;
    deadline: PromiseOrValue<BigNumberish>;
    amountCollected: PromiseOrValue<BigNumberish>;
    image: PromiseOrValue<string>;
    fundsWithdrawn: PromiseOrValue<boolean>;
    refunded: PromiseOrValue<boolean>;
    donators: PromiseOrValue<string>[];
    donations: PromiseOrValue<BigNumberish>[];
  };

  export type CampaignStructOutput = [
    string,
    string,
    string,
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    boolean,
    boolean,
    string[],
    BigNumber[]
  ] & {
    owner: string;
    title: string;
    description: string;
    target: BigNumber;
    deadline: BigNumber;
    amountCollected: BigNumber;
    image: string;
    fundsWithdrawn: boolean;
    refunded: boolean;
    donators: string[];
    donations: BigNumber[];
  };
}

export interface CrowdFundingInterface extends utils.Interface {
  functions: {
    "campaigns(uint256)": FunctionFragment;
    "createCampaign(address,string,string,uint256,uint256,string)": FunctionFragment;
    "donateToCampaign(uint256,uint256)": FunctionFragment;
    "donations(uint256,address)": FunctionFragment;
    "getCampaignDetails(uint256)": FunctionFragment;
    "getCampaigns()": FunctionFragment;
    "getDonators(uint256)": FunctionFragment;
    "numberOfCampaigns()": FunctionFragment;
    "refund(uint256)": FunctionFragment;
    "token()": FunctionFragment;
    "withdrawFunds(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "campaigns"
      | "createCampaign"
      | "donateToCampaign"
      | "donations"
      | "getCampaignDetails"
      | "getCampaigns"
      | "getDonators"
      | "numberOfCampaigns"
      | "refund"
      | "token"
      | "withdrawFunds"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "campaigns",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "createCampaign",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "donateToCampaign",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "donations",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getCampaignDetails",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getCampaigns",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getDonators",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "numberOfCampaigns",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "refund",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(functionFragment: "token", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawFunds",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "campaigns", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "createCampaign",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "donateToCampaign",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "donations", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getCampaignDetails",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCampaigns",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDonators",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "numberOfCampaigns",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "refund", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "token", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFunds",
    data: BytesLike
  ): Result;

  events: {
    "CampaignCreated(uint256,address,string,uint256,uint256)": EventFragment;
    "DonationReceived(uint256,address,uint256)": EventFragment;
    "FundsWithdrawn(uint256,address,uint256)": EventFragment;
    "RefundIssued(uint256,address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "CampaignCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "DonationReceived"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "FundsWithdrawn"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RefundIssued"): EventFragment;
}

export interface CampaignCreatedEventObject {
  campaignId: BigNumber;
  owner: string;
  title: string;
  target: BigNumber;
  deadline: BigNumber;
}
export type CampaignCreatedEvent = TypedEvent<
  [BigNumber, string, string, BigNumber, BigNumber],
  CampaignCreatedEventObject
>;

export type CampaignCreatedEventFilter = TypedEventFilter<CampaignCreatedEvent>;

export interface DonationReceivedEventObject {
  campaignId: BigNumber;
  donor: string;
  amount: BigNumber;
}
export type DonationReceivedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  DonationReceivedEventObject
>;

export type DonationReceivedEventFilter =
  TypedEventFilter<DonationReceivedEvent>;

export interface FundsWithdrawnEventObject {
  campaignId: BigNumber;
  owner: string;
  amount: BigNumber;
}
export type FundsWithdrawnEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  FundsWithdrawnEventObject
>;

export type FundsWithdrawnEventFilter = TypedEventFilter<FundsWithdrawnEvent>;

export interface RefundIssuedEventObject {
  campaignId: BigNumber;
  donor: string;
  amount: BigNumber;
}
export type RefundIssuedEvent = TypedEvent<
  [BigNumber, string, BigNumber],
  RefundIssuedEventObject
>;

export type RefundIssuedEventFilter = TypedEventFilter<RefundIssuedEvent>;

export interface CrowdFunding extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: CrowdFundingInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    campaigns(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        boolean,
        boolean
      ] & {
        owner: string;
        title: string;
        description: string;
        target: BigNumber;
        deadline: BigNumber;
        amountCollected: BigNumber;
        image: string;
        fundsWithdrawn: boolean;
        refunded: boolean;
      }
    >;

    createCampaign(
      _owner: PromiseOrValue<string>,
      _title: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      _target: PromiseOrValue<BigNumberish>,
      _deadline: PromiseOrValue<BigNumberish>,
      _image: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    donateToCampaign(
      _campaignId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    donations(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getCampaignDetails(
      _campaignId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        boolean,
        boolean
      ] & {
        owner: string;
        title: string;
        description: string;
        target: BigNumber;
        deadline: BigNumber;
        amountCollected: BigNumber;
        image: string;
        fundsWithdrawn: boolean;
        refunded: boolean;
      }
    >;

    getCampaigns(
      overrides?: CallOverrides
    ): Promise<[CrowdFunding.CampaignStructOutput[]]>;

    getDonators(
      _campaignId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[]]>;

    numberOfCampaigns(overrides?: CallOverrides): Promise<[BigNumber]>;

    refund(
      _campaignId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    token(overrides?: CallOverrides): Promise<[string]>;

    withdrawFunds(
      _campaignId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  campaigns(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [
      string,
      string,
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      string,
      boolean,
      boolean
    ] & {
      owner: string;
      title: string;
      description: string;
      target: BigNumber;
      deadline: BigNumber;
      amountCollected: BigNumber;
      image: string;
      fundsWithdrawn: boolean;
      refunded: boolean;
    }
  >;

  createCampaign(
    _owner: PromiseOrValue<string>,
    _title: PromiseOrValue<string>,
    _description: PromiseOrValue<string>,
    _target: PromiseOrValue<BigNumberish>,
    _deadline: PromiseOrValue<BigNumberish>,
    _image: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  donateToCampaign(
    _campaignId: PromiseOrValue<BigNumberish>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  donations(
    arg0: PromiseOrValue<BigNumberish>,
    arg1: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getCampaignDetails(
    _campaignId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [
      string,
      string,
      string,
      BigNumber,
      BigNumber,
      BigNumber,
      string,
      boolean,
      boolean
    ] & {
      owner: string;
      title: string;
      description: string;
      target: BigNumber;
      deadline: BigNumber;
      amountCollected: BigNumber;
      image: string;
      fundsWithdrawn: boolean;
      refunded: boolean;
    }
  >;

  getCampaigns(
    overrides?: CallOverrides
  ): Promise<CrowdFunding.CampaignStructOutput[]>;

  getDonators(
    _campaignId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[string[], BigNumber[]]>;

  numberOfCampaigns(overrides?: CallOverrides): Promise<BigNumber>;

  refund(
    _campaignId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  token(overrides?: CallOverrides): Promise<string>;

  withdrawFunds(
    _campaignId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    campaigns(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        boolean,
        boolean
      ] & {
        owner: string;
        title: string;
        description: string;
        target: BigNumber;
        deadline: BigNumber;
        amountCollected: BigNumber;
        image: string;
        fundsWithdrawn: boolean;
        refunded: boolean;
      }
    >;

    createCampaign(
      _owner: PromiseOrValue<string>,
      _title: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      _target: PromiseOrValue<BigNumberish>,
      _deadline: PromiseOrValue<BigNumberish>,
      _image: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    donateToCampaign(
      _campaignId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    donations(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCampaignDetails(
      _campaignId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [
        string,
        string,
        string,
        BigNumber,
        BigNumber,
        BigNumber,
        string,
        boolean,
        boolean
      ] & {
        owner: string;
        title: string;
        description: string;
        target: BigNumber;
        deadline: BigNumber;
        amountCollected: BigNumber;
        image: string;
        fundsWithdrawn: boolean;
        refunded: boolean;
      }
    >;

    getCampaigns(
      overrides?: CallOverrides
    ): Promise<CrowdFunding.CampaignStructOutput[]>;

    getDonators(
      _campaignId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string[], BigNumber[]]>;

    numberOfCampaigns(overrides?: CallOverrides): Promise<BigNumber>;

    refund(
      _campaignId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    token(overrides?: CallOverrides): Promise<string>;

    withdrawFunds(
      _campaignId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "CampaignCreated(uint256,address,string,uint256,uint256)"(
      campaignId?: PromiseOrValue<BigNumberish> | null,
      owner?: PromiseOrValue<string> | null,
      title?: null,
      target?: null,
      deadline?: null
    ): CampaignCreatedEventFilter;
    CampaignCreated(
      campaignId?: PromiseOrValue<BigNumberish> | null,
      owner?: PromiseOrValue<string> | null,
      title?: null,
      target?: null,
      deadline?: null
    ): CampaignCreatedEventFilter;

    "DonationReceived(uint256,address,uint256)"(
      campaignId?: PromiseOrValue<BigNumberish> | null,
      donor?: PromiseOrValue<string> | null,
      amount?: null
    ): DonationReceivedEventFilter;
    DonationReceived(
      campaignId?: PromiseOrValue<BigNumberish> | null,
      donor?: PromiseOrValue<string> | null,
      amount?: null
    ): DonationReceivedEventFilter;

    "FundsWithdrawn(uint256,address,uint256)"(
      campaignId?: PromiseOrValue<BigNumberish> | null,
      owner?: PromiseOrValue<string> | null,
      amount?: null
    ): FundsWithdrawnEventFilter;
    FundsWithdrawn(
      campaignId?: PromiseOrValue<BigNumberish> | null,
      owner?: PromiseOrValue<string> | null,
      amount?: null
    ): FundsWithdrawnEventFilter;

    "RefundIssued(uint256,address,uint256)"(
      campaignId?: PromiseOrValue<BigNumberish> | null,
      donor?: PromiseOrValue<string> | null,
      amount?: null
    ): RefundIssuedEventFilter;
    RefundIssued(
      campaignId?: PromiseOrValue<BigNumberish> | null,
      donor?: PromiseOrValue<string> | null,
      amount?: null
    ): RefundIssuedEventFilter;
  };

  estimateGas: {
    campaigns(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    createCampaign(
      _owner: PromiseOrValue<string>,
      _title: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      _target: PromiseOrValue<BigNumberish>,
      _deadline: PromiseOrValue<BigNumberish>,
      _image: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    donateToCampaign(
      _campaignId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    donations(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCampaignDetails(
      _campaignId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getCampaigns(overrides?: CallOverrides): Promise<BigNumber>;

    getDonators(
      _campaignId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    numberOfCampaigns(overrides?: CallOverrides): Promise<BigNumber>;

    refund(
      _campaignId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    token(overrides?: CallOverrides): Promise<BigNumber>;

    withdrawFunds(
      _campaignId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    campaigns(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    createCampaign(
      _owner: PromiseOrValue<string>,
      _title: PromiseOrValue<string>,
      _description: PromiseOrValue<string>,
      _target: PromiseOrValue<BigNumberish>,
      _deadline: PromiseOrValue<BigNumberish>,
      _image: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    donateToCampaign(
      _campaignId: PromiseOrValue<BigNumberish>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    donations(
      arg0: PromiseOrValue<BigNumberish>,
      arg1: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCampaignDetails(
      _campaignId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getCampaigns(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getDonators(
      _campaignId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    numberOfCampaigns(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    refund(
      _campaignId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    token(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    withdrawFunds(
      _campaignId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
