import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  position: fixed;
  bottom: 10%;
  right: 3%;
  padding: 0.3rem;
  background-color: #ffbb44;
  :hover {
    cursor: pointer;
  }
`;

const Arrow = styled.div`
  border-top: 3px solid black;
  border-right: 3px solid black;
  border-radius: 5%;
  transform: rotate(-45deg);
  height: 20px;
  width: 20px;
`;

const goToTopButoon = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      <Container onClick={scrollToTop}>
        <Arrow />
      </Container>
    </>
  );
};

export default goToTopButoon;
