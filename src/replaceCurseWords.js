const replaceCurseWords = async (content)  => {
  const response = await fetch(`https://www.purgomalum.com/service/json?text=${content}&`);
  const cleanContent = await response.json();
  return cleanContent.result
}

export default replaceCurseWords;
