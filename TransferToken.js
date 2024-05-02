import { useContract, useContractWrite, Web3Button } from '@thirdweb-dev/react'

export default function TransferToken() {
  const toAddress = '0x9101E40883008206F7adCD4B6c3B69B0d74854f6'
  const amount = 1
  // Contract must be an ERC-20 contract
  const contractAddress = '0x997BF0ebF2a2a2e8189493cedFd19bCDb077c0d0'
  const { contract, isLoading } = useContract(contractAddress)
  const { mutateAsync: transfer } = useContractWrite(contract, 'transfer')
  if (isLoading) return <p>Loading...</p>
  console.log(contractAddress)
  console.log(contract)
  const call = async () => {
    try {
      const data = await transfer({ args: [toAddress, amount] })
      console.info('contract call successs', data)
    } catch (err) {
      console.error('contract call failure', err)
    }
  }
  return <Web3Button action={call()}>Transfer</Web3Button>
}
