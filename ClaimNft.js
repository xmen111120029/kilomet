import {
  useAddress,
  useClaimNFT,
  useContract,
  useContractRead,
  useNFTs,
} from '@thirdweb-dev/react'

export default function ClaimNft() {
  const address = useAddress()
  const contractAddress = '0x07935E74D1f1f888DE4109B87a5747F4920F0A9F'
  const { contract } = useContract('0x07935E74D1f1f888DE4109B87a5747F4920F0A9F')
  const { mutate: claimNFT } = useClaimNFT(contract)
  const { data: totalMinted } = useContractRead(contract, 'totalMinted', [])
  const {
    data: nfts,
    isLoading,
    error,
  } = useNFTs(contract, {
    start: Number(totalMinted),
  })
  if (error) {
    console.error('failed to claim nft', error)
  }
  if (isLoading) return <p> Loading...</p>
  return (
    <div className="container">
      <div className="row d-flex justify-content-center my-5">
        <div className="col-6 col-md-4">
          <div className=" bg-light card border-success">
            <img src={nfts[0].metadata.image} className="card-img-top" />
            <h5 className="card-title mt-2 fst-italic text-body-tertiary">
              {nfts[0].metadata.name}
            </h5>
            <button
              disabled={isLoading}
              onClick={() => claimNFT({ to: address, quantity: 1 })}
              className="btn btn-success m-2 text-info fs-4"
            >
              Claim NFT
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
