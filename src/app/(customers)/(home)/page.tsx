import CallToActionSection from "./CallToActionSection"
import SessionSeletorSection from "./SessionSeletorSection"
import CategorySeletorSection from "./CategorySeletorSection"
import ProductByCategorySection from "./ProductByCategorySection"
import './style.scss'


export default function Home() {

  const categoryList = [
    {
      categoryId : 0,
      categoryIconUrl : 'rice.svg',
      name: 'Rice',
    },
    {
      categoryId : 1,
      categoryIconUrl : 'bread.svg',
      name: 'Bread',
    },
    {
      categoryId : 2,
      categoryIconUrl : 'drink.svg',
      name: 'Drink',
    },
    {
      categoryId : 3,
      categoryIconUrl : 'snack.svg',
      name: 'Snack',
    },
    {
      categoryId : 4,
      categoryIconUrl : 'others.svg',
      name: 'Others',
    },
  ]

  return (
    <>
      <CallToActionSection></CallToActionSection>
      <SessionSeletorSection></SessionSeletorSection>
      <CategorySeletorSection categoryList={categoryList}></CategorySeletorSection>
      {categoryList.map((category) => (
        <ProductByCategorySection key={category.categoryId} category={category}></ProductByCategorySection>
      ))}
      
    </>
  )
}