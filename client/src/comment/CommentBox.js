import React from "react";
import { Button, Input } from "antd";
import styled from "styled-components";

let CommentBox = ({ onChange, handleSubmit, submitting, value }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Wrapper>
      <Input
        name="message"
        rows={2}
        onChange={onChange}
        value={value}
        onKeyPress={handleKeyPress}
      />
      <Button
        rows={2}
        htmlType="submit"
        loading={submitting}
        onClick={handleSubmit}
        type="primary"
      >
        Send Message
      </Button>
    </Wrapper>
  );
};

export default CommentBox;

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: white;
  z-index: 5;
  padding: 20px 16px;
  padding-top: 0px;
`;
