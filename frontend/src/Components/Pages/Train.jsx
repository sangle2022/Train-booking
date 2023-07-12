import React, { useEffect, useState } from "react";


import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Link,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MdChair } from "react-icons/md";

import axios from "axios";
export const Train = () => {
  const [arr, setArray] = useState([]);
  const [value, setValue] = useState("");
  const [display, setDisPlay] = useState(false);
  const [change, setChange] = useState(false);
  const [message,setMassage]=useState("You are only allowed to book 1-7 seats")
  const [loading,setLoading]=useState(null)
  const [reset,setReset]=useState(null)

 
  const url='http://localhost:8080/train'

//  Booking seats
  const BookSeats = async () => {
    setLoading(true)       
    axios
        .post(url, { numSeats: +value })
        .then((res) => {
          let seats=res.data.seats.map((el)=>el.number)
          setChange(!change);
          console.log({data:res.data})
          setLoading(false)

        })
        .catch((err) => {
          console.log({err:err.response.data.message});
        });
    // }
  };
  //  handle Resete for  available for all seats
  const HadndleReset=()=>{
    setReset(true)
    axios.post(`${url}/reset`).then((res)=>{
      console.log(res.data)
      setReset(false)
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  useEffect(() => {
    axios.get(url).then((res) => {
      setArray(res.data.coach.seats);
      
      setChange(!change);
    });
  }, [change]);

// If data is fetching
  if(arr.length==0){
    return <Spinner
    margin={"auto"}
    mt="20%"
    thickness='6px'
    speed="0.90s"
    emptyColor="gray.200"
    color="blue.500"
    size="xl"
  />
  }

  return (
    <Stack w="98vw" boxSizing="border-box" mt={"1%"}>
        <Stack
          w={"90%"}
          margin={"auto"}
          direction={["column", "column", "row", "row"]}
          justify={"center"}
          align={"normal"}
          spacing={[16, 16, 8, 8]}
          boxSizing="border-box"
        >
          {/* left container */}
          <Stack
            className="leftSide"
            maxW={["100%", "100%", "55%", "45%"]}
            borderColor={"gray.300"}
            pr="4%"
          >
            <Stack
              direction={["column", "column", "row", "row"]}
              mt="15%"
              justify={"center"}
            >
              <Heading
                color={"red"}
                fontFamily={
                  "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
                }
                fontSize={["1rem", "1.5rem", "1.1rem", "1.8rem"]}
              >
                Train Booking System by
              </Heading>
              <Heading
                color={"black"}
                fontFamily={
                  "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"
                }
                fontSize={["1rem", "1.5rem", "1.1rem", "1.8rem"]}
                cursor={"pointer"}
              >
                <Link  href="https://gautam2s0.github.io/"
                _hover={{
                  textDecoration:"none"
                }}
                > Suraj Sangle</Link>
               
              </Heading>
            </Stack>

            {/* image or logo  container */}
            <Stack
              className="logo"
              direction={["column", "column", "row", "row"]}
              justify={"center"}
              align={"center"}
              mt="10%"
            >
              <Image
                maxW={"40%"}
                src={
                  "https://cdn3.iconfinder.com/data/icons/placeholder/64/train-placeholder-pin-pointer-gps-map-location-512.png"
                }
              />
              <Box
                fontWeight={"600"}
                fontSize={["1rem", "1.2rem"]}
                textAlign={"start"}
              >
                <Text color={"blue.300"}>TRAIN COACH: B1</Text>
                <Text color={"red.200"}>Train Number: 42224543</Text>
              </Box>
            </Stack>

            {/* input container */}
            <Stack className="input" justify={"start"} mt="5%">
              <Text color="red" display={display ? "block" : "none"}>
                {message}
              </Text>
              <Input
                maxW={"90%"}
                margin={"auto"}
                placeholder="Enter number of seats you want to book"
                border={"1px solid gray"}
                mt={"3%"}
                mr={["0%", "0%", "5%", "5%"]}
                type="number"
                value={value}
                focusBorderColor="none"
                onChange={(e) => {
                  console.log({ value: e.target.value });
                  if (e.target.value < 1 || e.target.value > 7) {
                    setDisPlay(true);
                  } else {
                    setDisPlay(false);
                  }
                  setChange(!change);
                  // console.log('change',change)
                  setValue(e.target.value);
                }}
              />
              {/* Button  Container */}
              <Box mt="3%">
                <Button
                  color={"white"}
                  bg={"green"}
                  p="1% 3%"
                  _hover={{
                    color: "#fff",
                    backgroundColor: "green",
                  }}
                  mr={"5%"}
                  onClick={BookSeats}
                  isDisabled={display}
                  isLoading={loading}
                  loadingText='Booking'
                >
                  Book Seats
                </Button>
                <Button 
                color={"#fff"}
                bg={"red"}
                p="1% 3%"
                _hover={{
                  color: "#fff",
                  backgroundColor: "#2F4F4F",
                }}
                mr={"5%"}
               onClick={HadndleReset}
                isLoading={reset}
                  loadingText='Reseting'
                >
                  Reset
                </Button>
                
                
                
              </Box>
            </Stack>
          </Stack>
          {/* Right Container */}
          <Stack
            className="rightSide"
            w={["95%", "95%", "50%", "50%"]}
            m="auto"
            pb="5%"
            boxSizing="border-box"
            borderTop={["1px solid gray", "1px solid gray", "none", "none"]}
          >
            {/* Image or logo of  Avialable and booked seats */}
            <Stack
              w={["80%", "80%", "60%", "60%"]}
              m={"auto"}
              p={["2% 15%", "2% 15%", "2%", "2%"]}
              direction={"row"}
              justify={"space-around"}
              spacing={16}
              boxShadow={
                "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
              }
              borderRadius={"5px"}
              fontSize={"1.5rem"}
              mt={["5%", "5%", "0", "0"]}
            >
              <Flex justify={"space-around"} gap={"5%"} align={"center"}>
                <MdChair style={{ color: "green", fontSize: "2rem" }} />
                <Text>Available</Text>
              </Flex>
              <Flex justify={"space-around"} gap={"5%"} align={"center"}>
                <MdChair style={{ color: "red", fontSize: "2rem" }} />
                <Text>Booked</Text>
              </Flex>
            </Stack>
            {/* Mapping Seats */}
            <Grid
              templateColumns="repeat(7, 1fr)"
              gap={4}
              mt="4%"
              ml={["0", "0", "5%", "5%"]}
            >
              {arr.map((el, i) => {
                const color = el.isBooked ? "red" : "green";
                return (
                  <Stack textAlign={"start"} key={i}>
                    <MdChair style={{ color: color, fontSize: "1.5rem" }} />
                    <Text fontWeight={"600"}>{i + 1}</Text>
                  </Stack>
                );
              })}
            </Grid>
          </Stack>
          
        </Stack>
        
    
    </Stack>
  );
};



                 