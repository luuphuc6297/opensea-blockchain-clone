import ContentWrapper from '../ContentWrapper';
import MainWrapper from '../MainWrapper';
import SEOHead, { SEOHeadProps } from '../SEOHead';

interface MainLayoutProps {
    headProps?: SEOHeadProps;
    children?: React.ReactNode;
}

const MainLayout = ({ headProps, children }: MainLayoutProps) => {
    return (
        <MainWrapper>
            {/* SEO */}
            <SEOHead {...headProps} />

            {/* Layout content */}
            <ContentWrapper>{children}</ContentWrapper>
        </MainWrapper>
    );
};

export default MainLayout;
