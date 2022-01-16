import { useEffect, useState } from "react";
import axios from "axios";
import Moralis from "moralis";
import { CHAIN, NFTPORT_API_KEY } from "../../utils/constants";
import SellButton from "../SellButton";
import CancelOrderButton from "../CancelOrder";
import LoadingIcon from "../LoadingIcon";

const OpenSeaInfo = ({ transaction_hash }) => {
  const [loading, setLoading] = useState(true);
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    async function getNFT() {
      const { data } = await axios.request({
        method: "GET",
        url: `https://api.nftport.xyz/v0/mints/${transaction_hash}`,
        params: { chain: CHAIN },
        headers: {
          "Content-Type": "application/json",
          Authorization: NFTPORT_API_KEY,
        },
      });
      if (data.response === "OK") {
        const response = await Moralis.Plugins.opensea.getAsset({
          network: "testnet",
          tokenAddress: data.contract_address,
          tokenId: data.token_id,
        });
        setAsset(response);
      }

      setLoading(false);
    }
    getNFT();
  }, [transaction_hash]);

  console.log(asset);

  return !loading ? (
    <div className="card mb-4">
      {asset ? (
        <div className="card-body">
          <a
            href={asset.openseaLink}
            target="_blank"
            className="btn btn-primary btn-lg"
            rel="noreferrer">
            View on OpenSea
          </a>
          {asset.sellOrders.length === 0 ? (
            <SellButton asset={asset} />
          ) : (
            <CancelOrderButton asset={asset} />
          )}
        </div>
      ) : (
        <p>
          Your transaction is still pending. Your details will show up here
          shortly!
        </p>
      )}
    </div>
  ) : (
    <LoadingIcon />
  );
};

export default OpenSeaInfo;
