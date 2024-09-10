import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { BusinessEntityAdded } from "../generated/schema"
import { BusinessEntityAdded as BusinessEntityAddedEvent } from "../generated/ImprovePayroll/ImprovePayroll"
import { handleBusinessEntityAdded } from "../src/improve-payroll"
import { createBusinessEntityAddedEvent } from "./improve-payroll-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let entityAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let entityName = "Example string value"
    let newBusinessEntityAddedEvent = createBusinessEntityAddedEvent(
      entityAddress,
      entityName
    )
    handleBusinessEntityAdded(newBusinessEntityAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BusinessEntityAdded created and stored", () => {
    assert.entityCount("BusinessEntityAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BusinessEntityAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "entityAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "BusinessEntityAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "entityName",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
