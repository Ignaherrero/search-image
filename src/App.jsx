import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
import { ContextImage } from "./image-context";

function App() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const elementRef = useRef();
  const { image, setImages } = useContext(ContextImage);
  const [page, setPage] = useState(1);

  const getData = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://pixabay.com/api/?${
        getValues("category") && `category=${getValues("category")}`
      }${getValues("q") && `&q=${getValues("q")}`}&page=${
        getValues("q").length > 0 ? 1 : page
      }&key=23015774-8905aaab4483ea57e236a976a&lang=es&safesearch=true`
    );
    const data = await response.json();
    setImages(data.hits);
    setIsLoading(false);
    if (getValues("q").length > 0) {
      setPage(1);
    }
    elementRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const onSubmit = (values) => {
    getData(values);
  };

  const handleChangePage = () => {
    setPage(page + 1);
  };

  const handleReturnAPage = () => {
    setPage(page - 1);
  };

  const handleChange = (values) => {
    setPage(1);
    console.log(values);
  };

  useEffect(() => {
    fetch(
      `https://pixabay.com/api/?${
        getValues("category") && `category=${getValues("category")}`
      }${
        getValues("q") && `&q=${getValues("q")}`
      }&page=${page}&key=23015774-8905aaab4483ea57e236a976a&lang=es&safesearch=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setImages(data.hits);
        setIsLoading(false);
        elementRef.current.scrollIntoView({ behavior: "smooth" });
      })
      .catch((err) => console.log(err));
  }, [page]);

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
                placeholder="Autos, campos, etc... - Buscar"
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
            {image.map((item) => (
              <Link to={`/d/${item.id}`} key={crypto.randomUUID()}>
                <Image
                  src={item.webformatURL}
                  alt={item.tags}
                  marginLeft={2}
                  marginTop={2}
                  width="99%"
                  _hover={{
                    opacity: 0.8,
                    transition: "opacity 0.5s",
                    cursor: "pointer",
                  }}
                />
              </Link>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </Box>
      <Flex justifyContent="center" marginTop={4} marginBottom={10}>
        <ButtonGroup>
          <Button onClick={() => handleReturnAPage()}>Atras</Button>
          <Text>{page}</Text>
          <Button isLoading={isLoading} onClick={() => handleChangePage()}>
            Siguiente
          </Button>
        </ButtonGroup>
      </Flex>
    </>
  );
}

export default App;
