import { useAppState } from '../../context';
import { CirclesWithBar } from 'react-loader-spinner';
import Offer from './Offer';
import React from 'react';
import { useLocation } from 'react-router';
import { OfferDetails } from '../Pages/OfferDetails';
import { OfferDesktop } from '../Pages/OfferDesktop';
import { ImSearch } from 'react-icons/im';

const OffersList = () => {
  const { loading, offers, filterOptions, setFilterOptions, darkMode } = useAppState();

  const [selectedOfferId, setSelectedOfferId] = React.useState(null);

  const { filteredOffers, searchQuery } = filterOptions;
  const location = useLocation();

  const offersToDisplay = filteredOffers;

  const [displayedOffers, setDisplayedOffers] = React.useState(offersToDisplay.slice(0, 10));

  React.useEffect(() => {
    setDisplayedOffers(offersToDisplay.slice(0, 10));
  }, [offersToDisplay]);

  const showMoreOffers = () => {
    const currentOffersLength = displayedOffers.length;
    const nextIndex = currentOffersLength + 15;
    const nextOffers = offersToDisplay.slice(currentOffersLength, nextIndex);
    setDisplayedOffers([...displayedOffers, ...nextOffers]);
  };



  React.useEffect(() => {
    if (location.pathname === '/devhirenet') {
      setDisplayedOffers(offers.slice(0, 10));
      setFilterOptions((prev) => ({ ...prev, searchQuery: '' }));
    }
  }, [location.pathname, offers]);

  const handleSelectOffer = (offerId) => {
    setSelectedOfferId(offerId);
  };

  return (
    <>
      <section className={`py-4 px-8 font-open lg:hidden ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        {loading ? (
          <CirclesWithBar
            className='py-10'
            height='100'
            width='100'
            wrapperStyle={{
              paddingTop: '160px',
              justifyContent: 'center',
            }}
            wrapperClass=''
            visible={true}
            outerCircleColor='rgb(59 130 246)'
            innerCircleColor='rgb(59 130 246)'
            barColor='rgb(59 130 246)'
            ariaLabel='circles-with-bar-loading'
          />
        ) : offersToDisplay ? (
          <>
            {displayedOffers.map((offer) => (
              <Offer key={offer.id} {...offer} darkMode={darkMode} />
            ))}
          </>
        ) : (
          'no offers '
        )}
        {!loading && offersToDisplay.length > displayedOffers.length && (
          <button
            onClick={showMoreOffers}
            className={`bg-blue-500 cursor-pointer  text-white px-4 py-2 mt-4 rounded flex m-auto ${darkMode ? 'hover:bg-blue-400' : 'hover:bg-blue-600'}`}
          >
            Show more
          </button>
        )}
      </section>

      <section className={`hidden overflow-hidden   lg:h-70vh lg:px-2  py-4 px-8 font-open lg:flex  lg:justify-between ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className='lg:w-1/2 max-h-full overflow-y-auto'>
          {loading ? (
            <CirclesWithBar
              className='py-10'
              height='100'
              width='100'
              wrapperStyle={{
                paddingTop: '160px',
                justifyContent: 'center',
              }}
              wrapperClass=''
              visible={true}
              outerCircleColor='rgb(59 130 246)'
              innerCircleColor='rgb(59 130 246)'
              barColor='rgb(59 130 246)'
              ariaLabel='circles-with-bar-loading'
            />
          ) : offersToDisplay ? (
            <>
              {displayedOffers.map((offer) => (
                <Offer
                  singleOffer={offer}
                  handleSelectDESKTOPOffer={handleSelectOffer}
                  className='lg:px-5'
                  key={offer.id}
                  {...offer}
                  darkMode={darkMode}
                />
              ))}
            </>
          ) : (
            'no offers '
          )}
          {!loading && offersToDisplay.length > displayedOffers.length && (
            <button
              onClick={showMoreOffers}
              className={`bg-blue-500 cursor-pointer  text-white px-4 py-2 mt-4 rounded flex m-auto ${darkMode ? 'hover:bg-blue-400' : 'hover:bg-blue-600'}`}
            >
              Show more
            </button>
          )}
        </div>
        <div className='lg:w-1/2 lg:h-70vh'>
          {selectedOfferId ? (
            <OfferDesktop offerId={selectedOfferId} />
          ) : loading ? (
            <CirclesWithBar
              className='py-10'
              height='100'
              width='100'
              wrapperStyle={{
                paddingTop: '160px',
                justifyContent: 'center',
              }}
              wrapperClass=''
              visible={true}
              outerCircleColor='rgb(59 130 246)'
              innerCircleColor='rgb(59 130 246)'
              barColor='rgb(59 130 246)'
              ariaLabel='circles-with-bar-loading'
            />
          ) : (
            <div className='flex flex-col items-center justify-center h-full'>
              <div className='flex flex-col items-center'>
                <ImSearch className='text-6xl text-blue-500 mb-4' />
                <p className='text-lg  text-center'>Click on an offer to view details</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default OffersList;
