const ParentComponent = () => {
    const [filteredProducts, setFilteredProducts] = useState(products); // products is your product list
  
    const handleSearch = (filters) => {
      const { price, size, brand } = filters;
  
      const filtered = products.filter((product) => {
        const matchesPrice = price ? product.price <= parseFloat(price) : true;
        const matchesSize = size ? product.size === size : true;
        const matchesBrand = brand ? product.brand.toLowerCase().includes(brand.toLowerCase()) : true;
        return matchesPrice && matchesSize && matchesBrand;
      });
  
      setFilteredProducts(filtered);
    };
  
    return (
      <div>
        <Navbar onSearch={handleSearch} />
        {/* Render your filtered products */}
        <ProductList products={filteredProducts} />
      </div>
    );
  };
  