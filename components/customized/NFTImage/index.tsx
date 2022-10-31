import { AiOutlineHeart } from 'react-icons/ai';
import { IoMdSnow } from 'react-icons/io';

interface NFTImageProps {
    selectedNft: any;
}

const nftImageStyles = {
    topBar: `bg-[#303339] p-2 rounded-t-lg border-[#151c22] border`,
    topBarContent: `flex items-center`,
    likesCounter: `flex-1 flex items-center justify-end`,
};

const NFTImage = ({ selectedNft }: NFTImageProps) => {
    return (
        <div>
            <div className={nftImageStyles.topBar}>
                <div className={nftImageStyles.topBarContent}>
                    <IoMdSnow />
                    <div className={nftImageStyles.likesCounter}>
                        <AiOutlineHeart />
                        2.3K
                    </div>
                </div>
            </div>
            <div>
                {console.log(selectedNft, '🎆')}
                <img src={selectedNft?.image} />
            </div>
        </div>
    );
};

export default NFTImage;
