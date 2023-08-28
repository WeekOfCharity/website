import { useEffect, useState } from 'react';
import { useBidwarResults } from '../hooks/useBidwarResults';
import { getDocumentTitle } from '../utils/getDocumentTitle';

const formatter = new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' });

export const BidwarWidget = () => {

  document.title = getDocumentTitle('BidwarWidget');

  const { data: bidwarResults, status: bidwarResultsStatus, refetch: refetchBidwarResults } = useBidwarResults();

  useEffect(() => {
    const id = setInterval(() => {
      refetchBidwarResults();
    }, 5000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex flex-col p-8 text-xl">
      {bidwarResultsStatus === "success" && bidwarResults.results.map((result) => {
        if (!result.active) return;
        
        return (
          <div className="m-2 p-3 bg-[darkgreen] text-white">
            <h2>{result.bidwar_name} - {result.bidwar_description}</h2>
            <div className="flex flex-col text-md p-3">
              {result.options && 
                Object.keys(result.options)
                .sort((a, b) => result.options[b] - result.options[a])
                .map((key) => {
                  return <span>{key}: {formatter.format(result.options[key]/100)}</span>
                })
              }
            </div>
          </div>
        );
      })}
    </div>
  );
};
