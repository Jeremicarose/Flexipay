'use client'

import Typography from '@mui/material/Typography'
import Stack from '@mui/system/Stack'

import MainLayout from '@/layouts'
import ConnectButtons from '@/sections/common/ConnectButtons'
import { useAccount } from 'wagmi'
import { useEffect, useState } from 'react'
import { selectOrganization, selectRole } from '@/state/selectors'
import { useAppDispatch, useAppSelector } from '@/state/hooks'
import CreateOrganization from '@/sections/employer/CreateOrganization'
import OrganizationSection from '@/sections/employer/OrganizationSection'
import EmployeeSection from '@/sections/employee/EmployeeSection'
import { fetchOrganization } from '@/services/read-services'
import { setOrganization } from '@/state/app'
import { Divider } from '@mui/material'

export default function Home() {
  const dispatch = useAppDispatch()
  const { address, isConnecting, isDisconnected } = useAccount()
  const [loading, setLoading] = useState(false)
  const role = useAppSelector(selectRole)
  const org = useAppSelector(selectOrganization)
  const isEmployer = role === 'employer'

  useEffect(() => {
    async function fetchData() {
      if (!address) return
      const org = await fetchOrganization(address)
      dispatch(setOrganization(org))
      setLoading(false)
    }
    fetchData()
  }, [address, dispatch])

  console.log('org', org)
  return (
    <MainLayout>
      <div className="min-h-screen items-center pt-24 pb-2 px-4">
        <Stack sx={{ width: '100%' }}>
          {isDisconnected && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* <Image src="/lemonpay.png" width="500" height="1000" /> */}
              </div>

              <ConnectButtons />
              <Divider style={{ marginTop: "20px" }} />
              <Typography style={{ marginTop: "10px", color: "gray", fontWeight: "bold" }} textAlign={'center'}>Powered By</Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "10px"
                }}
              >
                {/* <Image src="/partners.png" width="500" height="1000" /> */}
              </div>
            </>
          )}
          {isConnecting && <Typography textAlign={'center'}>Connecting...</Typography>}
          {loading && <Typography textAlign={'center'}>Loading...</Typography>}
          {!loading && isEmployer && !!address && !org?.orgName && (
            <CreateOrganization address={address} />
          )}
          {!loading && isEmployer && !!address && !!org?.orgName && (
            <OrganizationSection address={address} />
          )}
          {!loading && !isEmployer && !isConnecting && !isDisconnected && <EmployeeSection />}
        </Stack>
      </div>
    </MainLayout>
  )
}
