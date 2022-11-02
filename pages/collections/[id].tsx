import { useWeb3 } from '@3rdweb/hooks';
import { ThirdwebSDK } from '@3rdweb/sdk';
import { Header, NFTCard } from '@components';
import { client } from '@services/sanity';
import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
import { CgWebsite } from 'react-icons/cg';
import { HiDotsVertical } from 'react-icons/hi';

const collectionStyles = {
    bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center`,
    bannerImage: `w-full object-cover`,
    infoContainer: `w-screen px-4`,
    midRow: `w-full flex justify-center text-white`,
    endRow: `w-full flex justify-end text-white`,
    profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
    socialIconsContainer: `flex text-3xl mb-[-2rem]`,
    socialIconsWrapper: `w-44`,
    socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
    socialIcon: `my-2`,
    divider: `border-r-2`,
    title: `text-5xl font-bold mb-4`,
    createdBy: `text-lg mb-4`,
    statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
    collectionStat: `w-1/4`,
    statValue: `text-3xl font-bold w-full flex items-center justify-center`,
    ethLogo: `h-6 mr-2`,
    statName: `text-lg w-full text-center mt-1`,
    description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
};

const Collection = () => {
    const router = useRouter();
    const { provider } = useWeb3();

    const { collectionId }: string | string[] | any = router.query;

    const [collection, setCollection] = React.useState<any>({});
    const [nfts, setNfts] = React.useState([]);
    const [listings, setListings] = React.useState([]);

    const nftModule = React.useMemo(() => {
        if (!provider) return;

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            // @ts-ignore
            'https://goerli.infura.io/v3/6ce152511f1844acb65792f8fa05ae75'
        );
        return sdk.getNFTModule(collectionId);
    }, [provider]);

    // get all NFTs in the collection
    React.useEffect(() => {
        if (!nftModule) return;
        (async () => {
            const nfts = await nftModule.getAll();

            setNfts(nfts);
        })();
    }, [nftModule]);

    const marketPlaceModule = React.useMemo(() => {
        if (!provider) return;

        const sdk = new ThirdwebSDK(
            provider.getSigner(),
            // @ts-ignore
            'https://goerli.infura.io/v3/6ce152511f1844acb65792f8fa05ae75'
        );
        return sdk.getMarketplaceModule('0x1a010FE05E166B4133B0af6738Ad85a50D02E305');
    }, [provider]);

    // Get all listings in the collection
    React.useEffect(() => {
        if (!marketPlaceModule) return;
        (async () => {
            setListings(await marketPlaceModule.getAllListings());
        })();
    }, [marketPlaceModule]);

    const fetchCollectionData = async (sanityClient = client) => {
        const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
            "imageUrl": profileImage.asset->url,
            "bannerImageUrl": bannerImage.asset->url,
            volumeTraded,
            createdBy,
            contractAddress,
            "creator": createdBy->userName,
            title, floorPrice,
            "allOwners": owners[]->,
            description
        }`;

        const collectionData = await sanityClient.fetch(query);

        console.log(collectionData, '🔥');

        // the query returns 1 object inside of an array
        await setCollection(collectionData[0]);
    };

    return (
        <div className="overflow-hidden">
            <Header />
            <div className={collectionStyles.bannerImageContainer}>
                <img
                    className={collectionStyles.bannerImage}
                    src={collection?.bannerImageUrl ? collection.bannerImageUrl : 'https://via.placeholder.com/200'}
                    alt="banner"
                />
            </div>
            <div className={collectionStyles.infoContainer}>
                <div className={collectionStyles.midRow}>
                    <img
                        className={collectionStyles.profileImg}
                        src={collection?.imageUrl ? collection.imageUrl : 'https://via.placeholder.com/200'}
                        alt="profile image"
                    />
                </div>
                <div className={collectionStyles.endRow}>
                    <div className={collectionStyles.socialIconsContainer}>
                        <div className={collectionStyles.socialIconsWrapper}>
                            <div className={collectionStyles.socialIconsContent}>
                                <div className={collectionStyles.socialIcon}>
                                    <CgWebsite />
                                </div>
                                <div className={collectionStyles.divider} />
                                <div className={collectionStyles.socialIcon}>
                                    <AiOutlineInstagram />
                                </div>
                                <div className={collectionStyles.divider} />
                                <div className={collectionStyles.socialIcon}>
                                    <AiOutlineTwitter />
                                </div>
                                <div className={collectionStyles.divider} />
                                <div className={collectionStyles.socialIcon}>
                                    <HiDotsVertical />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={collectionStyles.midRow}>
                    <div className={collectionStyles.title}>{collection?.title}</div>
                </div>
                <div className={collectionStyles.midRow}>
                    <div className={collectionStyles.createdBy}>
                        Created by <span className="text-[#2081e2]">{collection?.creator}</span>
                    </div>
                </div>
                <div className={collectionStyles.midRow}>
                    <div className={collectionStyles.statsContainer}>
                        <div className={collectionStyles.collectionStat}>
                            <div className={collectionStyles.statValue}>{nfts.length}</div>
                            <div className={collectionStyles.statName}>items</div>
                        </div>
                        <div className={collectionStyles.collectionStat}>
                            <div className={collectionStyles.statValue}>
                                {collection?.allOwners ? collection.allOwners.length : ''}
                            </div>
                            <div className={collectionStyles.statName}>owners</div>
                        </div>
                        <div className={collectionStyles.collectionStat}>
                            <div className={collectionStyles.statValue}>
                                <img
                                    src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                                    alt="eth"
                                    className={collectionStyles.ethLogo}
                                />
                                {collection?.floorPrice}
                            </div>
                            <div className={collectionStyles.statName}>floor price</div>
                        </div>
                        <div className={collectionStyles.collectionStat}>
                            <div className={collectionStyles.statValue}>
                                <img
                                    src="https://storage.opensea.io/files/6f8e2979d428180222796ff4a33ab929.svg"
                                    alt="eth"
                                    className={collectionStyles.ethLogo}
                                />
                                {collection?.volumeTraded}.5K
                            </div>
                            <div className={collectionStyles.statName}>volume traded</div>
                        </div>
                    </div>
                </div>
                <div className={collectionStyles.midRow}>
                    <div className={collectionStyles.description}>{collection?.description}</div>
                </div>
            </div>
            <div className="flex flex-wrap ">
                {nfts.map((nftItem, id) => (
                    <NFTCard key={id} nftItem={nftItem} title={collection?.title} listings={listings} />
                ))}
            </div>
        </div>
    );
};

export default Collection;
