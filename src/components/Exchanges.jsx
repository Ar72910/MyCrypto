import { Container, HStack, VStack,Image, Heading,Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {server} from "../index"
import Loader  from './Loader'
import ErrorComponent  from './ErrorComponent'



const Exchanges = () => {

  const [exchanges,setExchanges] = useState([])
  const [loading,setLoading] = useState([])
  const [error,setError] = useState(false)


  useEffect(()=>{

    const fetchExchanges = async()=>{

      try{
          const {data} = await axios.get(`${server}/exchanges`)
          setExchanges(data)
          setLoading(false)
         

      }
      catch(error){
        // alert("You have done something wrong");
        setError(true)
        setLoading(false)
        

      }
      
    };
    fetchExchanges();


  },[]);

  if(error) return <ErrorComponent message ={"Error While Fetching exchenges"} />

  return (
   <Container maxW={"container.xl"} >
   {loading ?( <Loader/>): (
    <> 
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {
              
              exchanges.map((i)=>(
               <ExchangeCard 
                key = {i.id}
                name ={i.name} 
                img = {i.image} 
                rank = {i.trust_score_rank} 
                url = {i.url}

                />
      ) )}
  
          </HStack>
    </>
      )}
   
   
   </Container>
  
 );
 };


 const ExchangeCard =({name , img, rank, url})=>{

  return <a href= {url} target={'blank'}>
  <VStack w = {"52"} shadow={"1g"} p = {"8"} borderRadius={"1g"} transition={"all 0.3s"} m={4}

        css={{
          "&:hover":{
            transform:"scale(1.1)"
          }

        }}
  >

    <Image src = {img} w = {"10"} h = {"10"} objectFit={"contain"} alt = {"Exchange"}></Image>  

    <Heading size={"md"} noOfLines={1}>{rank}</Heading>

    <Text noOfLines={1}>{name}</Text>

    </VStack>
  
  </a>
 }
 

  
  
  
    
  
 
export default Exchanges