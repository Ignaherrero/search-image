import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Grid,
  Heading,
  HStack,
  Image,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { set, useForm } from "react-hook-form";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link, Route, Routes } from "react-router-dom";
import { Description } from "./Description";

function Main() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const elementRef = useRef();

  const getData = async (values = { category: "", q: "" }, page = 1) => {
    setIsLoading(true);
    const response = await fetch(
      `https://pixabay.com/api/?page&${
        values.category && `category=${values.category}`
      }${values.q && `&q=${values.q}`}${
        page && `&page=${page}`
      }&key=23015774-8905aaab4483ea57e236a976a`
    );
    const data = await response.json();
    console.log(data);
    setData(data.hits);
    setIsLoading(false);
    elementRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    getData();
  }, [page]);

  const onSubmit = (values) => {
    getData(values);
  };

  const handleChangePage = (values) => {
    setPage(page + 1);
    getData(values, page);
  };

  const handleReturnAPage = (values) => {
    setPage(page - 1);
    getData(values, page);
  };

  const handleChange = (values) => {
    setPage(1);
    console.log(values);
    getData(values);
  };

  return (
    <>
      <Box height={40}>
        <Heading
          fontSize="md"
          fontSize={40}
          marginTop={4}
          marginBottom={4}
          ref={elementRef}
          textAlign="center"
        >
          Imagenes para tu pc
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <HStack justifyContent="center">
            <FormControl width="400px">
              <Input
                type="text"
                {...register("q")}
                placeholder="Busca imagenes"
              />
            </FormControl>
            <FormControl width="200px">
              <Select {...register("category", { required: true })}>
                <option value="backgrounds">backgrounds</option>
                <option value="fashion">fashion</option>
                <option value="nature">nature</option>
                <option value="science">science</option>
                <option value="education">education</option>
                <option value="feelings">feelings</option>
                <option value="health">health</option>
                <option value="people">people</option>
                <option value="religion">religion</option>
                <option value="places">places</option>
                <option value="animals">animals</option>
                <option value="industry">industry</option>
                <option value="computer">computer</option>
                <option value="food">food</option>
                <option value="sports">sports</option>
                <option value="transportation">transportation</option>
                <option value="travel">travel</option>
                <option value="buildings">buildings</option>
                <option value="business">business</option>
                <option value="music">music</option>
              </Select>
            </FormControl>

            <Button type="submit" variant="solid" colorScheme="blue">
              Buscar
            </Button>
          </HStack>
        </form>
      </Box>

      <Box maxWidth="100%">
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry>
            {data.map((item) => (
              <Image
                src={item.webformatURL}
                alt={item.tags}
                marginLeft={2}
                marginTop={2}
                _hover={{
                  opacity: 0.8,
                  transition: "opacity 0.5s",
                  cursor: "pointer",
                }}
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </Box>
      <Flex justifyContent="center" marginTop={4} marginBottom={10}>
        <ButtonGroup>
          <Button onClick={handleSubmit(handleReturnAPage)}>Atras</Button>
          <Text>{page}</Text>
          <Button
            isLoading={isLoading}
            onClick={handleSubmit(handleChangePage)}
          >
            Siguiente
          </Button>
          <Link to="/d">description</Link>
        </ButtonGroup>
      </Flex>
    </>
  );
}

export default Main;
