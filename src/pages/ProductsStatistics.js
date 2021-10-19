import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import firebase from "firebase/app";
import DateDiff from "date-diff";
import "firebase/firestore";
import Layout from "../layout/DefaultLayout";
import CustomHelmet from "../components/elements/CustomHelmet";
import ProductsStatsTable from "../components/CartComponents/ProductsStatsTable";
import BarGraph from "../components/Graphs/BarGraph";
import StatsCard from "../components/CartComponents/StatsCard";
import DashGraph from "../components/Graphs/DashGraph";
import StatsSkeleton from "../components/skeletons/StatsSkeleton";
import BargraphSkeleton from "../components/skeletons/BargraphSkeleton";
import Tablekeleton from "../components/skeletons/Tablekeleton";
import { ReactComponent as ProductIcone } from "../assets/fragile.svg";
import { pageContainersVariants } from "../utils/variants";

const ProductsStatistics = () => {
  let isMounted = true;
  const db = firebase.firestore();
  const [products, setProducts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [productsInfo, setProductsinfo] = useState({ total: 0, data: [] });
  const [collectionsInfo, setCollectionsinfo] = useState({
    total: 0,
    data: [],
  });
  const [popularProducts, setpopulatProducts] = useState({});
  const [popularCollections, setpopularCollections] = useState({});
  const [fetchProducts, setFetchproducts] = useState(true);
  const [fetchCollections, setFetchCollections] = useState(true);
  const [feedback, setFeedback] = useState({ status: null, message: null });

  const getMax = (arr) => {
    var maxValue = Number.MIN_VALUE;

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].visits > maxValue) {
        maxValue = arr[i].visits;
      }
    }
    const found = arr.findIndex((x) => x.visits === maxValue);
    return arr[found];
  };

  const handleStats = async (arr, arr2, arr3, parent) => {
    const today = new Date();

    const AllProducts = [];
    const src1 = [];
    const src2 = [];
    const src3 = [];
    const src4 = [];
    const src5 = [];
    const src6 = [];
    const src7 = [];
    const finalProducts = [];
    const byTime = [];

    const filterArrays = () => {
      arr2.map((product) => {
        const b = {};
        b.name = product;
        b.data = [
          src7.filter((x) => x === product).length,
          src6.filter((x) => x === product).length,
          src5.filter((x) => x === product).length,
          src4.filter((x) => x === product).length,
          src3.filter((x) => x === product).length,
          src2.filter((x) => x === product).length,
          src1.filter((x) => x === product).length,
        ];
        finalProducts.push(b);
      });
    };

    if (parent === "product") {
      arr.map((item) => {
        const diff = new DateDiff(today, item.createdAt);
        if (
          diff.days() >= 0 &&
          diff.days() <= 1 &&
          item.createdAt.getDate() === today.getDate()
        ) {
          src1.push(item.productName);
        } else if (diff.days() > 0 && diff.days() <= 1) {
          src2.push(item.productName);
        } else if (diff.days() > 1 && diff.days() <= 2) {
          src3.push(item.productName);
        } else if (diff.days() > 2 && diff.days() <= 3) {
          src4.push(item.productName);
        } else if (diff.days() > 3 && diff.days() <= 4) {
          src5.push(item.productName);
        } else if (diff.days() > 4 && diff.days() <= 5) {
          src6.push(item.productName);
        } else if (diff.days() > 5 && diff.days() <= 6) {
          src7.push(item.productName);
        }
        if (item.productName) {
          AllProducts.push(item.productName);
        }
      });
      await getFullProducts();
      const max = getMax(arr3);
      filterArrays();
      setpopulatProducts(max);
      setProducts(finalProducts);
    } else if (parent === "collection") {
      arr.map((item) => {
        const diff = new DateDiff(today, item.createdAt);
        if (
          diff.days() >= 0 &&
          diff.days() <= 1 &&
          item.createdAt.getDate() === today.getDate()
        ) {
          src1.push(item.collectionName);
        } else if (diff.days() > 0 && diff.days() <= 1) {
          src2.push(item.collectionName);
        } else if (diff.days() > 1 && diff.days() <= 2) {
          src3.push(item.collectionName);
        } else if (diff.days() > 2 && diff.days() <= 3) {
          src4.push(item.collectionName);
        } else if (diff.days() > 3 && diff.days() <= 4) {
          src5.push(item.collectionName);
        } else if (diff.days() > 4 && diff.days() <= 5) {
          src6.push(item.collectionName);
        } else if (diff.days() > 5 && diff.days() <= 6) {
          src7.push(item.collectionName);
        }
        if (item.collectionName) {
          AllProducts.push(item.collectionName);
        }
      });
      filterArrays();
      setCollections(finalProducts);
    }
  };

  const getFullProducts = async () => {
    db.collection("popularProducts")
      .orderBy("visits", "desc")
      .get()
      .then((snap) => {
        const arr = [];
        let total = 0;
        snap.forEach((doc) => {
          const p = doc.data();
          p.id = doc.id;
          p.createdAt = p.createdAt.toDate().toDateString();
          arr.push(p);
          total += p.visits;
        });
        setProductsinfo({ ...popularProducts, data: arr, total: total });
      });
  };

  useEffect(() => {
    isMounted = true;

    const unsebscribeProducts = db
      .collection("popularProducts")
      .orderBy("visits", "desc")
      .limit(10)
      .onSnapshot((querySnapshot) => {
        const all = [];
        const popularArr = [];
        const uniqueProducts = [];

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            const p = doc.data();
            popularArr.push({ name: p.name, visits: p.visits, img: p.img });
            uniqueProducts.push(p.name);

            p.visitsByTime.map((s) => {
              const n = { ...s, productName: p.name };
              n.createdAt = s.createdAt.toDate();
              all.push(n);
            });
          });
          setFetchproducts(false);
          handleStats(all, uniqueProducts, popularArr, "product");
        }
      });

    const unsebscribeCollection = db
      .collection("popularCollections")
      .orderBy("visits", "desc")
      .onSnapshot((querySnapshot) => {
        if (!querySnapshot.empty) {
          const all = [];
          const uniqueProducts = [];
          const popularArr = [];
          //
          const arr = [];
          const arr2 = [];
          let total = 0;
          querySnapshot.forEach((doc) => {
            const c = doc.data();
            c.createdAt = c.createdAt.toDate().toDateString();
            total += c.visits;
            arr.push(c);
            arr2.push({ name: c.name, visits: c.visits, img: c.img });
            uniqueProducts.push(c.name);
            c.visitsByTime.map((s) => {
              const n = { ...s, collectionName: c.name };
              n.createdAt = s.createdAt.toDate();
              all.push(n);
            });
          });
          setCollectionsinfo({ ...collectionsInfo, total: total, data: arr });
          const max = getMax(arr2);
          handleStats(all, uniqueProducts, popularArr, "collection");
          setpopularCollections(max);
          setFetchCollections(false);
        }
      });

    return () => {
      unsebscribeCollection();
      unsebscribeProducts();
      isMounted = false;
    };
  }, []);

  return (
    <Layout>
      <Container
        animate="visible"
        initial="hidden"
        exit="exit"
        variants={pageContainersVariants}
      >
        <CustomHelmet title="Products Statistics" />
        <div className="row p-row-1">
          {fetchCollections ? (
            <StatsSkeleton />
          ) : (
            <StatsCard
              Icone={ProductIcone}
              title="Most Popular Categorie"
              products
              itemName={popularCollections?.name}
              itemVisits={popularCollections?.visits}
              productImg={popularCollections?.img}
            />
          )}
          {fetchProducts ? (
            <StatsSkeleton />
          ) : (
            <StatsCard
              Icone={ProductIcone}
              title="Most Popular Product"
              products
              itemName={popularProducts?.name}
              itemVisits={popularProducts?.visits}
              productImg={popularProducts?.img}
            />
          )}
        </div>
        <div className="row p-row-2">
          {fetchCollections ? (
            <BargraphSkeleton />
          ) : (
            <BarGraph data={collections} title="Most Popular Categories" />
          )}
          {fetchProducts ? (
            <BargraphSkeleton />
          ) : (
            <DashGraph data={products} title="Most Popular Products" />
          )}
        </div>
        <div className="row p-row-3">
          {fetchProducts ? (
            <Tablekeleton />
          ) : (
            <ProductsStatsTable
              title="real time statistics"
              products={productsInfo?.data}
              productTotal={productsInfo?.total}
              collections={collectionsInfo?.data}
              collectionTotal={collectionsInfo?.total}
            />
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default ProductsStatistics;

const Container = styled(motion.div)`
  margin: 1em;
  .p-row-1 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
  }
  .p-row-2 {
    margin: 1em 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1em;
  }
  @media only screen and (max-width: 1200px) {
    .p-row-2 {
      grid-template-columns: 100% !important;
    }
  }
  @media only screen and (max-width: 1000px) {
    .p-row-1 {
      grid-template-columns: 100% !important;
    }
  }
  @media only screen and (max-width: 600px) {
    .row-1 {
      grid-template-columns: 100% !important;
      grid-template-rows: auto auto auto auto;
    }
  }
`;
