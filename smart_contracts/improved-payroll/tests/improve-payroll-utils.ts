import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  BusinessEntityAdded,
  BusinessEntityFunded,
  DaysWorkedUpdated,
  FreelancerAdded,
  OwnershipTransferred,
  PayoutMade,
  PlatformFeeUpdated,
  TokenAdded,
  TokenRemoved
} from "../generated/ImprovePayroll/ImprovePayroll"

export function createBusinessEntityAddedEvent(
  entityAddress: Address,
  entityName: string
): BusinessEntityAdded {
  let businessEntityAddedEvent = changetype<BusinessEntityAdded>(newMockEvent())

  businessEntityAddedEvent.parameters = new Array()

  businessEntityAddedEvent.parameters.push(
    new ethereum.EventParam(
      "entityAddress",
      ethereum.Value.fromAddress(entityAddress)
    )
  )
  businessEntityAddedEvent.parameters.push(
    new ethereum.EventParam("entityName", ethereum.Value.fromString(entityName))
  )

  return businessEntityAddedEvent
}

export function createBusinessEntityFundedEvent(
  entityAddress: Address,
  amount: BigInt,
  tokenAddress: Address
): BusinessEntityFunded {
  let businessEntityFundedEvent = changetype<BusinessEntityFunded>(
    newMockEvent()
  )

  businessEntityFundedEvent.parameters = new Array()

  businessEntityFundedEvent.parameters.push(
    new ethereum.EventParam(
      "entityAddress",
      ethereum.Value.fromAddress(entityAddress)
    )
  )
  businessEntityFundedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  businessEntityFundedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )

  return businessEntityFundedEvent
}

export function createDaysWorkedUpdatedEvent(
  freelancerAddress: Address,
  daysWorked: BigInt
): DaysWorkedUpdated {
  let daysWorkedUpdatedEvent = changetype<DaysWorkedUpdated>(newMockEvent())

  daysWorkedUpdatedEvent.parameters = new Array()

  daysWorkedUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "freelancerAddress",
      ethereum.Value.fromAddress(freelancerAddress)
    )
  )
  daysWorkedUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "daysWorked",
      ethereum.Value.fromUnsignedBigInt(daysWorked)
    )
  )

  return daysWorkedUpdatedEvent
}

export function createFreelancerAddedEvent(
  freelancerAddress: Address,
  entityAddress: Address,
  dailyRateWei: BigInt,
  projectDescription: string
): FreelancerAdded {
  let freelancerAddedEvent = changetype<FreelancerAdded>(newMockEvent())

  freelancerAddedEvent.parameters = new Array()

  freelancerAddedEvent.parameters.push(
    new ethereum.EventParam(
      "freelancerAddress",
      ethereum.Value.fromAddress(freelancerAddress)
    )
  )
  freelancerAddedEvent.parameters.push(
    new ethereum.EventParam(
      "entityAddress",
      ethereum.Value.fromAddress(entityAddress)
    )
  )
  freelancerAddedEvent.parameters.push(
    new ethereum.EventParam(
      "dailyRateWei",
      ethereum.Value.fromUnsignedBigInt(dailyRateWei)
    )
  )
  freelancerAddedEvent.parameters.push(
    new ethereum.EventParam(
      "projectDescription",
      ethereum.Value.fromString(projectDescription)
    )
  )

  return freelancerAddedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createPayoutMadeEvent(
  freelancerAddress: Address,
  amount: BigInt,
  tokenAddress: Address
): PayoutMade {
  let payoutMadeEvent = changetype<PayoutMade>(newMockEvent())

  payoutMadeEvent.parameters = new Array()

  payoutMadeEvent.parameters.push(
    new ethereum.EventParam(
      "freelancerAddress",
      ethereum.Value.fromAddress(freelancerAddress)
    )
  )
  payoutMadeEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  payoutMadeEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )

  return payoutMadeEvent
}

export function createPlatformFeeUpdatedEvent(
  newFeePercentage: BigInt
): PlatformFeeUpdated {
  let platformFeeUpdatedEvent = changetype<PlatformFeeUpdated>(newMockEvent())

  platformFeeUpdatedEvent.parameters = new Array()

  platformFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newFeePercentage",
      ethereum.Value.fromUnsignedBigInt(newFeePercentage)
    )
  )

  return platformFeeUpdatedEvent
}

export function createTokenAddedEvent(tokenAddress: Address): TokenAdded {
  let tokenAddedEvent = changetype<TokenAdded>(newMockEvent())

  tokenAddedEvent.parameters = new Array()

  tokenAddedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )

  return tokenAddedEvent
}

export function createTokenRemovedEvent(tokenAddress: Address): TokenRemoved {
  let tokenRemovedEvent = changetype<TokenRemoved>(newMockEvent())

  tokenRemovedEvent.parameters = new Array()

  tokenRemovedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenAddress",
      ethereum.Value.fromAddress(tokenAddress)
    )
  )

  return tokenRemovedEvent
}
