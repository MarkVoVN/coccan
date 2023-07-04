"use client";
import SearchResultSection from "@/components/SearchResultSection";
import "./search.scss";
import { ThemeProvider } from "@mui/material";
import theme from "../../../theme";
import { useAppSelector } from "@/app/GlobalRedux/Features/userSlice";
import React from "react";
import axios, { AxiosResponse } from "axios";

function SearchPage({ params }: { params: { keyword: string } }) {
  const sessionId = useAppSelector((state) => state.order.value.sessionId);
  const [StoreList, setStoreList] = React.useState<
    {
      id: string;
      name: string;
      image: string;
      address: string;
      product: {
        id: string;
        price: number;
        menuId: string;
        product: {
          id: string;
          name: string;
          image: string;
          category: { id: string; name: string; image: string };
        };
      }[];
    }[]
  >();

  const [isStoreLoading, setIsStoreLoading] = React.useState(true);
  const [isError, setIsError] = React.useState(false);

  React.useEffect(() => {
    const parameter = {
      filter: JSON.stringify({
        search: decodeURIComponent(params.keyword),
        session: sessionId,
      }),
    };

    const queryParams = new URLSearchParams(parameter);

    const url = "https://coccan-api.somee.com/api/stores";

    axios
      .get(url, { params: queryParams })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("Request error: " + response.status);
        }
        return response;
      })
      .then((response) => {
        var list: {
          id: string;
          name: string;
          image: string;
          address: string;
          product: {
            id: string;
            price: number;
            menuId: string;
            product: {
              id: string;
              name: string;
              image: string;
              category: { id: string; name: string; image: string };
            };
          }[];
        }[] = [];

        axios
          .all(
            response.data.map(
              (store: {
                id: string;
                name: string;
                image: string;
                address: string;
                product: [];
              }) => {
                const params = {
                  filter: JSON.stringify({
                    session: sessionId,
                    store: store.id,
                  }),
                };
                const queryParams = new URLSearchParams(params);
                const url = `https://coccan-api.somee.com/api/menudetails`;
                return axios.get(url, { params: queryParams });
              }
            )
          )
          .then((responseList) => {
            var pListList: {
              id: string;
              price: number;
              menuId: string;
              product: {
                id: string;
                name: string;
                image: string;
                category: { id: string; name: string; image: string };
              };
            }[][] = [];

            responseList.forEach((response) => {
              // @ts-ignore
              pListList.push(response.data);
            });

            for (var i = 0; i < response.data.length; i++) {
              list.push({
                ...response.data[i],
                product: pListList[i],
              });
            }

            setStoreList(list);
            setIsStoreLoading(false);
            setIsError(false);
          });
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, [sessionId, params.keyword, isError]);

  return (
    <ThemeProvider theme={theme}>
      {isStoreLoading && !isError && (
        <>
          <h2>Loading ....</h2>
        </>
      )}
      {isError && <h2>Error</h2>}
      {!isStoreLoading && !isError && !StoreList && (
        <>
          <h2>{`There are no Store active during this session with the name containing keyword`}</h2>
        </>
      )}
      {!isStoreLoading && !isError && StoreList && (
        <>
          <SearchResultSection
            StoreList={StoreList}
            keyword={decodeURIComponent(params.keyword)}
          ></SearchResultSection>
        </>
      )}
    </ThemeProvider>
  );
}

export default SearchPage;
