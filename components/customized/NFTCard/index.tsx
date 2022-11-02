import Router from 'next/router';
import React from 'react';
import { BiHeart } from 'react-icons/bi';

interface NFTCardProps {
    nftItem: any;
    title: string;
    listings: any;
}

const nftStyles = {
    wrapper: `bg-[#303339] flex-auto w-[14rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer`,
    imgContainer: `h-2/3 w-full overflow-hidden flex justify-center items-center`,
    nftImg: `w-full object-cover`,
    details: `p-3`,
    info: `flex justify-between text-[#e4e8eb] drop-shadow-xl`,
    infoLeft: `flex-0.6 flex-wrap`,
    collectionName: `font-semibold text-sm text-[#8a939b]`,
    assetName: `font-bold text-lg mt-2`,
    infoRight: `flex-0.4 text-right`,
    priceTag: `font-semibold text-sm text-[#8a939b]`,
    priceValue: `flex items-center text-xl font-bold mt-2`,
    ethLogo: `h-5 mr-2`,
    likes: `text-[#8a939b] font-bold flex items-center w-full justify-end mt-3`,
    likeIcon: `text-xl mr-2`,
};

export const NFTCard = ({ nftItem, title, listings }: NFTCardProps) => {
    const [isListed, setIsListed] = React.useState(false);
    const [price, setPrice] = React.useState(0);

    React.useEffect(() => {
        const listing = listings.find((listing) => listing.asset.id === nftItem.id);
        if (Boolean(listing)) {
            setIsListed(true);
            setPrice(listing.buyoutCurrencyValuePerToken.displayValue);
        }
    }, [listings, nftItem]);

    return (
        <div
            className={nftStyles.wrapper}
            onClick={() => {
                Router.push({
                    pathname: `/nfts/${nftItem.id}`,
                    query: { isListed: isListed },
                });
            }}
        >
            <div className={nftStyles.imgContainer}>
                <img src={nftItem.image} alt={nftItem.name} className={nftStyles.nftImg} />
            </div>

            <div className={nftStyles.details}>
                <div className={nftStyles.info}>
                    <div className={nftStyles.infoLeft}>
                        <div className={nftStyles.collectionName}>{title}</div>
                        <div className={nftStyles.assetName}>{nftItem.name}</div>
                    </div>
                    {isListed && (
                        <div className={nftStyles.infoRight}>
                            <div className={nftStyles.priceTag}>Price</div>
                            <div className={nftStyles.priceValue}>
                                <img
                                    src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                                    alt="eth"
                                    className={nftStyles.ethLogo}
                                />
                                {price}
                            </div>
                        </div>
                    )}
                </div>
                <div className={nftStyles.likes}>
                    <span className={nftStyles.likeIcon}>
                        <BiHeart />
                    </span>{' '}
                    {nftItem.likes}
                </div>
            </div>
        </div>
    );
};
