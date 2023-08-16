import ContentLoader from 'react-content-loader';

const PizzaSkeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={500}
    viewBox="0 0 280 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="135" cy="139" r="125" />
    <rect x="-1" y="280" rx="10" ry="10" width="280" height="23" />
    <rect x="0" y="324" rx="10" ry="10" width="280" height="83" />
    <rect x="0" y="431" rx="10" ry="10" width="97" height="30" />
    <rect x="172" y="425" rx="25" ry="25" width="108" height="45" />
  </ContentLoader>
);

export default PizzaSkeleton;
