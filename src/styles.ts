import styled from "styled-components";

export const TestT = styled.div`
  display: flex;
  flex-direction: column;
  display: flex;
  gap: 0.75rem;
  margin: 2rem;

  > div {
    display: flex;
    flex-direction: row;

    justify-content: space-between;
    width: 700px;

    h3 {
      width: 100%;
      text-align: center;
      margin-bottom: 1.75rem;
    }
  }
  > div > div {
    width: 158px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
    padding: 1rem 2rem 2rem;
    border-radius: 8px;
    color: #888;
    height: 120px;
    border: 2px solid #444;
  }

  strong {
    margin-right: 0.25rem;
  }
`;
