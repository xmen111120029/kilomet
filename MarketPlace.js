import {
  useAddress,
  useContract,
  useContractEvents,
  useContractWrite,
  useTransferToken,
} from '@thirdweb-dev/react'

export default function MarketPlace() {
  const address = useAddress()
  const contractAddress = '0x905BAe91569339fa21de6aaba9B0564CeBd9F7F4'
  const { contract } = useContract(contractAddress)
  const { mutateAsync: approve, isLoading } = useContractWrite(
    contract,
    'approve'
  )
  const { mutate: transferTokens } = useTransferToken(contract)
  const { data: event } = useContractEvents(contract, 'Approval')
  console.log(event)
  if (isLoading) return <p>Loading...</p>
  const appr = async () => {
    try {
      const data = await approve({
        args: [address, document.getElementById('total').value],
      })
      console.log(data)
      console.info('contract call successs', data)
    } catch (err) {
      console.error('contract call failure', err)
    }
  }
  function transfer() {
    transferTokens({
      to: '0xD06017DBe313520bAFb045CEF588ca12b7649D9f',
      amount: document.getElementById('total').value,
    })
  }
  return (
    <div>
      <button onClick={appr}>Approve</button>
      <button onClick={transfer}>Send</button>
      <input type="number" id="total" />
    </div>
  )
}
