'use client'

import { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import { Button, Paper } from '@mui/material'
import { fetchEmployee } from '@/services/read-services'
import { Employee } from '@/state/types'
import { formatEther } from 'viem'
import Iconify from '@/components/iconify'
import { paySalary } from '@/services/write-services'
import { toast } from 'react-toastify'
import { useEnsAvatar, useEnsName } from 'wagmi'
import { config } from '@/config'
import { sepolia } from 'viem/chains'

type Props = {
  address: `0x${string}`
}

export default function EmployeeInformation({ address }: Props) {
  const [employeeInfo, setEmployeeInfo] = useState<Employee | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  const { data: ensName } = useEnsName({
    address,
    chainId: sepolia.id,
  })

  const { data: avatarUrl } = useEnsAvatar({
    name: ensName ?? undefined,
  })

  useEffect(() => {
    const loadEmployeeInfo = async () => {
      try {
        const employee = await fetchEmployee(address)
        setEmployeeInfo(employee)
      } catch (error) {
        console.error("Error fetching employee info:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadEmployeeInfo()
  }, [address])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!employeeInfo) {
    return <div>No employee information found.</div>
  }

  return (
    <div>
      <div className="employeeContainer">
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            margin: 'auto',
            '& > :not(style)': {
              m: 1,
              width: 1000,
              height: 300,
            },
          }}
        >
          <Paper elevation={24}>
            <div className="paper">
              <div className="employeeUserSide">
                {/* <Paper elevation={24}>
                  <Box
                    component="img"
                    sx={{
                      height: 200,
                      width: 200,
                      boxShadow: 5,
                    }}
                    alt="Employee avatar"
                    src={avatarUrl || "/loading.webp"}
                  />
                </Paper> */}
                <p>User Address</p>
                <div>
                  <p className="ensName">{ensName || address.substring(0, 15) + '...'}</p>
                </div>
              </div>
              <div className="employeeDataSide">
                <div className="employeeData">
                  <div className="employeeDataLabels">
                    <ul className="employeeDataLabels">
                      <li>🗓️ Days worked:</li>
                      <li>💰 Day Wage:</li>
                      <li>⚙️ Activity:</li>
                    </ul>
                  </div>
                  <div className="employeeDataValues">
                    <ul className="employeeDataValues">
                      <li>{employeeInfo.daysWorked}</li>
                      <li>{formatEther(BigInt(employeeInfo.salary))} Ξ</li>
                      <li>{employeeInfo.activity}</li>
                    </ul>
                  </div>
                </div>
                <div className="totalBalance">
                  <p className="balancep">
                    Balance: <span className="value">{formatEther(BigInt(employeeInfo.daysWorked * employeeInfo.salary))} Ξ</span>
                  </p>
                  <Button
                    style={{ minWidth: '200px', minHeight: '35px' }}
                    variant="contained"
                    color="success"
                    onClick={async () => {
                      try {
                        const tx = await paySalary(address)
                        toast.success(`🦄 salary payment transaction submitted! transaction: ${tx}`)
                      } catch (error) {
                        console.error(error)
                        toast.error(`Payment failed: ${error}`)
                      }
                    }}
                  >
                    <Iconify icon="tabler:world" />
                    Pay Now
                  </Button>
                </div>
              </div>
            </div>
          </Paper>
        </Box>
      </div>
    </div>
  )
}