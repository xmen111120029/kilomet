import { Web3Button, useChain } from '@thirdweb-dev/react'
import GetAllNftMinted from '../NftHandle/GetAllNftMinted'
import GetOwnedNFTs from '../NftHandle/GetOwnedNFTs'

export default function Home({ contractAddress, isSelected }) {
  const chain = useChain()
  if (chain) {
    const isLineaMainnet = chain.chainId === 59144 ? true : false
    return (
      <div className="container py-5">
        {isLineaMainnet ? (
          contractAddress !== '' && isSelected ? (
            <GetOwnedNFTs contractAddress={contractAddress} />
          ) : (
            <GetAllNftMinted contractAddress={contractAddress} />
          )
        ) : (
          <div>
            <Web3Button className="bg-warning" />
            <p className="title fs-5 fw-medium text-black">
              Please switch to Linea Mainnet!
            </p>
          </div>
        )}
      </div>
    )
  }
  return <div className="container py-5">Connect to website!</div>
}
