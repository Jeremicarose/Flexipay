'use client'

// import { useWeb3Modal } from '@web3modal/wagmi/react'
import { useAppDispatch } from '@/state/hooks'
import Box from '@mui/material/Box'
import { Button, Stack, Grid, TextField, Typography } from '@mui/material'
import { useAccount } from 'wagmi';
// import WorldID from './WorldID'
import EmployeeInformation from './EmployeeInformation'
//import fetch from 'node-fetch'

export default function EmployeeSection() {
  const { address } = useAccount()



  if (!address) {
    return null
  }

  return (
    <div>
      <Stack sx={{ width: '100%' }}>

        <Typography textAlign={'center'} color="primary" variant="h2">
          Welcome
        </Typography>

        <EmployeeInformation
          address={address}
        />
      </Stack>
    </div >
  )


}

