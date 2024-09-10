import {
  BusinessEntityAdded as BusinessEntityAddedEvent,
  BusinessEntityFunded as BusinessEntityFundedEvent,
  DaysWorkedUpdated as DaysWorkedUpdatedEvent,
  FreelancerAdded as FreelancerAddedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  PayoutMade as PayoutMadeEvent,
  PlatformFeeUpdated as PlatformFeeUpdatedEvent,
  TokenAdded as TokenAddedEvent,
  TokenRemoved as TokenRemovedEvent
} from "../generated/ImprovePayroll/ImprovePayroll"
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
} from "../generated/schema"

export function handleBusinessEntityAdded(
  event: BusinessEntityAddedEvent
): void {
  let entity = new BusinessEntityAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.entityAddress = event.params.entityAddress
  entity.entityName = event.params.entityName

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleBusinessEntityFunded(
  event: BusinessEntityFundedEvent
): void {
  let entity = new BusinessEntityFunded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.entityAddress = event.params.entityAddress
  entity.amount = event.params.amount
  entity.tokenAddress = event.params.tokenAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleDaysWorkedUpdated(event: DaysWorkedUpdatedEvent): void {
  let entity = new DaysWorkedUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.freelancerAddress = event.params.freelancerAddress
  entity.daysWorked = event.params.daysWorked

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFreelancerAdded(event: FreelancerAddedEvent): void {
  let entity = new FreelancerAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.freelancerAddress = event.params.freelancerAddress
  entity.entityAddress = event.params.entityAddress
  entity.dailyRateWei = event.params.dailyRateWei
  entity.projectDescription = event.params.projectDescription

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePayoutMade(event: PayoutMadeEvent): void {
  let entity = new PayoutMade(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.freelancerAddress = event.params.freelancerAddress
  entity.amount = event.params.amount
  entity.tokenAddress = event.params.tokenAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePlatformFeeUpdated(event: PlatformFeeUpdatedEvent): void {
  let entity = new PlatformFeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newFeePercentage = event.params.newFeePercentage

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenAdded(event: TokenAddedEvent): void {
  let entity = new TokenAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenAddress = event.params.tokenAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenRemoved(event: TokenRemovedEvent): void {
  let entity = new TokenRemoved(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.tokenAddress = event.params.tokenAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
