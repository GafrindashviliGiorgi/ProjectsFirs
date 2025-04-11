import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const images = [
    { id: 1, src: 'k1.png', alt: 'Sneaker side view' },
    { id: 2, src: 'k2.png', alt: 'Sneaker top view' },
    { id: 3, src: 'k3.png', alt: 'Sneaker detail' },
    { id: 4, src: 'k4.png', alt: 'Sneaker angled view' }
  ];

  const [selectedImg, setSelectedImg] = useState(images[0]);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const product = {
    brand: "SNEAKER COMPANY",
    name: "Fall Limited Edition Sneakers",
    description: "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they'll withstand everything the weather can offer.",
    price: 125.00,
    discount: 50,
    originalPrice: 250,
  };

  const discountedPrice = product.price * (1 - product.discount / 100);


  function addToCart  () {
    const newItem = {
      id: Date.now(),
      name: product.name,
      price: discountedPrice,
      quantity,
      image: selectedImg.src
    };
    setCartItems([...cartItems, newItem]);
    setIsCartOpen(true);
  };

  function removeFromCart (id)  {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  function navigateImage (direction)  {
    const currentIndex = images.findIndex(img => img.id === selectedImg.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % images.length;
    } else {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }
    
    setSelectedImg(images[newIndex]);
  };



  useEffect(() => {
    function handleKeyDown (e)  {

      
      if (lightboxOpen) {
        if (e.key === 'ArrowRight') {
          navigateImage('next');
        } else if (e.key === 'ArrowLeft') {
          navigateImage('prev');
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, selectedImg]);


  function back() {
    window.location.href = "https://project3-mu-green.vercel.app/"
  }

  return (
    <div className="k1">
      <header className="k2">
        <div className="k3">
          <button className="k4" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <img src="icons8-menu.gif" alt="Menu" className="k5" />
          </button>
          <h1 className="k6" onClick={back}>sneakers</h1>
          <nav className={`k7 ${isMenuOpen ? 'k8' : ''}`}>
            <button className="k9" onClick={() => setIsMenuOpen(false)}>
              <img src="icons8-menu.gif" alt="Close menu" className="k10" />
            </button>
            <ul className="k11">
              <li className="k12"><a href="https://react-project-things.vercel.app/" className='k13'>Collections</a></li>
              <li className="k12"><a href="https://react-project-things.vercel.app/" className="k13">Men</a></li>
              <li className="k12"><a href="https://react-project-things.vercel.app/" className="k13">Women</a></li>
              <li className="k12"><a href="https://react-project-things.vercel.app/" className="k13">About</a></li>
              <li className="k12"><a href="https://react-project-things.vercel.app/" className="k13">Contact</a></li>
            </ul>
          </nav>
        </div>
        
        <div className="k14">
          <div className="k15" onClick={() => setIsCartOpen(!isCartOpen)}>
            <img src="buy.png" alt="Cart" className="k16" />
            {cartItems.length > 0 && (
              <span className="k17">{cartItems.reduce((total, item) => total + item.quantity, 0)}</span>
            )}
          </div>
          <img src="Oval.png" alt="User avatar" className="k18" />
        </div>
      </header>

      {isCartOpen && (
        <div className="k19">
          <h3 className="k20">Cart</h3>
          <div className="k21">
            {cartItems.length === 0 ? (
              <p className="k22">Your cart is empty</p>
            ) : (
              <>
                <ul className="k23">
                  {cartItems.map(item => (
                    <li key={item.id} className="k24">
                      <img src={item.image} alt={item.name} className="k25" />
                      <div className="k26">
                        <p className="k27">{item.name}</p>
                        <p className="k28">
                          ${item.price.toFixed(2)} x {item.quantity} 
                          <span className="k29">${(item.price * item.quantity).toFixed(2)}</span>
                        </p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)} 
                        className="k30"
                      >
                        <img src="delete.png" alt="Remove" className="k31" />
                      </button>
                    </li>
                  ))}
                </ul>
                <button className="k32">Checkout</button>
              </>
            )}
          </div>
        </div>
      )}

      {lightboxOpen && (
        <div className="k33" onClick={() => setLightboxOpen(false)}>
          <div className="k34" onClick={(e) => e.stopPropagation()}>
            <button className="k35" onClick={() => setLightboxOpen(false)}>
              <span>×</span>
            </button>
            <div className="k36">
              <button 
                className="k37 k38" 
                onClick={() => navigateImage('prev')}
              >
                <span>❮</span>
              </button>
              <img 
                src={selectedImg.src} 
                alt={selectedImg.alt} 
                className="k39"
              />
              <button className="k37 k40" onClick={ () => navigateImage('next')}><span>❯</span></button>
            </div>
            <div className="k41">
              {images.map(img => (
                <button 
                  key={img.id}
                  className={`k42 ${selectedImg.id === img.id ? 'k43' : ''}`}
                  onClick={() => setSelectedImg(img)}
                >
                  <img src={img.src} alt={img.alt} className="k44" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="k45">
        <section className="k46">
          <div className="k47">
            <img 
              src={selectedImg.src} 
              alt={selectedImg.alt} 
              className="k48" 
              onClick={() => setLightboxOpen(true)}
            />
            <button 
              className="k49 k50" 
              onClick={() => navigateImage('prev')}
            >
              <span>❮</span>
            </button>
            <button 
              className="k49 k51" 
              onClick={() => navigateImage('next')}
            >
              <span>❯</span>
            </button>
          </div>
          <div className="k52">
            {images.map(img => (
              <button 
                key={img.id}
                className={`k42 ${selectedImg.id === img.id ? 'k43' : ''}`}
                onClick={() => setSelectedImg(img)}
              >
                <img src={img.src} alt={img.alt} className="k44" />
              </button>
            ))}
          </div>
        </section>

        <section className="k53">
          <p className="k54">{product.brand}</p>
          <h2 className="k55">{product.name}</h2>
          <p className="k56">{product.description}</p>
          
          <div className="k57">
            <div className="k58">
              <span className="k59">${discountedPrice.toFixed(2)}</span>
              <span className="k60">{product.discount}%</span>
            </div>
            <p className="k61">${product.originalPrice.toFixed(2)}</p>
          </div>

          <div className="k62">
            <div className="k63">
              <button 
                onClick={ () => setQuantity(quantity - 1)} 
                className="k64"
              >
                <img src="minus.png" alt="Decrease" className="k65" />
              </button>
              <span className="k66">{quantity}</span>
              <button 
                onClick={ () => setQuantity(quantity + 1)} 

                className="k64"
              >
                <img src="plus.png" alt="Increase" className="k65" />
              </button>
            </div>
            <button className="k67" onClick={addToCart}>Add to cart</button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;