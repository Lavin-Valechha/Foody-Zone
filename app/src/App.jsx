import {useEffect, useState} from 'react';
import styled from 'styled-components';
import SearchResult from './components/SearchResult/SearchResult';

export const BASE_URL = "http://localhost:9000";

const App = () => {
  const [data,setData] = useState(null);
  const [FilteredData, setFilteredData] = useState(null);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const [selectedbtn, setselectedbtn] = useState("all");

  useEffect(()=>{
    const fetchFoodData = async() => {
      setLoading(true);

      try{
        const response = await fetch(BASE_URL);
        const json = await response.json();
        
        setData(json);
        setFilteredData(json);
        setLoading(false);
      }
      catch(error){
        setError("Unable to fetch data");
      }
    };
    fetchFoodData();
  },[]);

  const searchFood = (e) => {
    const searchValue = e.target.value;

    if(searchValue == ""){
      setFilteredData(null);
    }

    const filter = data?.filter((food) => 
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);

  };


  const filterFood = (type) => {
    if(type == "all"){
      setFilteredData(data);
      setselectedbtn("all");
      return;
    }

    const filter = data?.filter((food) => 
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setImmediate(type);
  }

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading....</div>

  return(
  <>
  <Container>
    <TopContainer>
      <div className="logo">
        <img src="/images/logo (2).png" alt="logo" />
        
      </div>

      <div className='search'>
        <input onChange={searchFood} placeholder='Search Food...' />
      </div>
      
    </TopContainer>

    <FilterContainer>
      <Button onClick={() => filterFood("all")}>All</Button>
      <Button onClick={() => filterFood("breakfast")}>Breakfast</Button>
      <Button onClick={() => filterFood("lunch")}>Lunch</Button>
      <Button onClick={() => filterFood("dinner")}>Dinner</Button>
    </FilterContainer>
  </Container>

  <SearchResult data={FilteredData} />
  </> 
  )
};

export default App;

 export const Container = styled.div`
max-width: 1200px;
margin: 0 auto;

`;

const TopContainer = styled.section`
height: 90px;
display: flex;
justify-content: space-between;
padding: 16px;
align-items: center;


.logo {
  img {
    width: 400px;  /* Set the desired width */
    height: 150px;  /* Set the desired height */
    object-fit: contain;  /* Ensures the image scales correctly */
  }
}

.search {
  input{
    background-color: transparent;
    border: 1px solid red;
    color: white;
    border-radius: 5px;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;
    &::placeholder{
      color: white;
    }
  }
}

@media (0 < width < 600px){
  flex-direction: column;
  height: 120px;
}

`;

const FilterContainer = styled.section`
  display: flex;
  justify-content: center;
  gap: 12px;
  padding-bottom: 40px;
`;

const Button = styled.button`
  background-color: #ff4343;
  border-radius: 5px ;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover{
    background-color: #7b1010;
  }
`;



