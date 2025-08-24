// 商品数据 - 添加了description属性
// combat战斗    consumable消耗品     building建筑     kit
const products = [
    {
        id: 1,
        name: "PvP 补给",
        price: 10,
        image: "images/1.png",
        category: "kit",
        description: "用于在cpvp中补给物资的KIT，可以与Alien V4中的“自动补给”功能搭配使用"
    },
    {
        id: 2,
        name: "生存 KIT",
        price: 10,
        image: "images/2.png",
        category: "kit",
        description: "适于生存玩家的KIT，购买后赠送一盒烟花、一盒图腾"
    },
    {
        id: 3,
        name: "PvP KIT",
        price: 16,
        image: "images/3.png",
        category: "kit",
        description: "适于PvP玩家的KIT，购买后赠送一盒烟花、一盒图腾"
    },
    {
        id: 4,
        name: "末地水晶",
        price: 16,
        image: "images/4.png",
        category: "combat",
        description: "cpvp必备"
    },
    {
        id: 5,
        name: "重生锚",
        price: 20,
        image: "images/5.png",
        category: "combat",
        description: "用于在地狱设置重生点"
    },
    {
        id: 6,
        name: " 萤石",
        price: 2,
        image: "images/6.png",
        category: "building",
        description: "可以给重生锚充能，或者照亮某个地方"
    },
    {
        id: 7,
        name: "黑曜石",
        price: 2,
        image: "images/7.png",
        category: "building",
        description: "一种很硬的石头"
    },
    {
        id: 8,
        name: "金苹果",
        price: 15,
        image: "images/8.png",
        category: "consumable",
        description: "食用后可以恢复血量"
    },
    {
        id: 9,
        name: "不死图腾",
        price: 0.5,
        image: "images/9.png",
        category: "consumable",
        description: "放在副手可以让你多一条命"
    },
    {
        id: 10,
        name: "神龟药水",
        price: 0.5,
        image: "images/10.png",
        category: "combat",
        description: "拥有很高的抗性提升效果，但会减少移动速度"
    },
    {
        id: 11,
        name: "力量药水",
        price: 0.5,
        image: "images/11.png",
        category: "combat",
        description: "打人更痛"
    },
    {
        id: 12,
        name: "白板鞘翅",
        price: 20,
        image: "images/12.png",
        category: "consumable",
        description: "无附魔的鞘翅"
    },
    {
        id: 13,
        name: "满配鞘翅",
        price: 25,
        image: "images/13.png",
        category: "consumable",
        description: "满配的鞘翅"
    },
    {
        id: 14,
        name: "烟花火箭",
        price: 1.5,
        image: "images/14.png",
        category: "consumable",
        description: "默认为3速火箭，特殊需求请备注"
    },
    {
        id: 15,
        name: "末影珍珠",
        price: 2,
        image: "images/15.png",
        category: "consumable",
        description: "传送工具"
    },
    {
        id: 16,
        name: "烈焰棒",
        price: 3,
        image: "images/16.png",
        category: "consumable",
        description: "合成材料"
    },
    {
        id: 17,
        name: "附魔之瓶",
        price: 5,
        image: "images/17.png",
        category: "consumable",
        description: "可以修复拥有经验修复附魔的装备"
    },
    {
        id: 18,
        name: "绿宝石块",
        price: 10,
        image: "images/18.png",
        category: "building",
        description: "用于与村民交易的材料"
    },
    {
        id: 19,
        name: "金块",
        price: 5,
        image: "images/19.png",
        category: "building",
        description: "建筑材料"
    },
    {
        id: 20,
        name: "任意原木",
        price: 0.5,
        image: "images/20.png",
        category: "building",
        description: "想致富，先撸树"
    },
    {
        id: 21,
        name: "铁块",
        price: 3,
        image: "images/21.png",
        category: "building",
        description: "建筑材料"
    },
    {
        id: 22,
        name: "金胡萝卜",
        price: 4,
        image: "images/22.png",
        category: "consumable",
        description: "最抗饿的食物"
    }
];

// 购物车数据
let cart = [];
let currentCategory = 'all';
let searchQuery = '';

// DOM元素
const cartButton = document.getElementById('cartButton');
const cartOverlay = document.getElementById('cartOverlay');
const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const totalPriceElement = document.getElementById('totalPrice');
const minOrderMsg = document.getElementById('minOrderMsg');
const checkoutBtn = document.getElementById('checkoutBtn');
const categoryButtons = document.querySelectorAll('.category-btn');
const searchInput = document.getElementById('searchInput');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    updateCartUI();
    
    // 事件监听
    cartButton.addEventListener('click', openCart);
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) closeCart();
    });
    
    checkoutBtn.addEventListener('click', createOrder);
    
    // 分类筛选
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            currentCategory = button.dataset.category;
            renderProducts();
        });
    });
    
    // 搜索功能
    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase();
        renderProducts();
    });
});

// 渲染商品列表
function renderProducts() {
    productsGrid.innerHTML = '';
    
    const filteredProducts = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery) || 
                             product.description.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });
    
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <div class="product-name-price">
                    <span class="product-name">${product.name}</span>
                    <span class="product-price">${product.price}￥</span>
                </div>
                <div class="product-description">${product.description}</div>
                <button class="add-to-cart-btn" data-id="${product.id}">加入购物车</button>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // 添加加入购物车事件
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });
}

// 添加到购物车
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    updateCartUI();
    // 移除了自动打开购物车的功能
}

// 更新购物车UI
function updateCartUI() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>购物车为空</p>';
    } else {
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease-btn" data-id="${item.id}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase-btn" data-id="${item.id}">+</button>
                        <button class="remove-btn" data-id="${item.id}">删除</button>
                    </div>
                </div>
                <div class="cart-item-price">${item.price * item.quantity}￥</div>
            `;
            cartItems.appendChild(cartItem);
        });
    }
    
    // 计算总价
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalPriceElement.textContent = total;
    
    // 更新下单按钮状态
    if (total >= 8) {
        checkoutBtn.disabled = false;
        minOrderMsg.style.display = 'none';
    } else {
        checkoutBtn.disabled = true;
        minOrderMsg.style.display = 'block';
    }
    
    // 添加购物车内按钮事件
    document.querySelectorAll('.increase-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            increaseQuantity(id);
        });
    });
    
    document.querySelectorAll('.decrease-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            decreaseQuantity(id);
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            removeFromCart(id);
        });
    });
}

// 增加商品数量
function increaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += 1;
        updateCartUI();
    }
}

// 减少商品数量
function decreaseQuantity(productId) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity -= 1;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// 从购物车移除商品
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// 打开购物车
function openCart() {
    cartOverlay.style.display = 'flex';
}

// 关闭购物车
function closeCart() {
    cartOverlay.style.display = 'none';
}

// 创建订单
function createOrder() {
    if (cart.length === 0) return;
    
    let orderText = "3C3U 商店订单\n";
    cart.forEach(item => {
        orderText += `${item.name} ×${item.quantity} | ${item.price * item.quantity}￥\n`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    orderText += `总价：${total}￥`;
    
    // 复制到剪贴板
    navigator.clipboard.writeText(orderText).then(() => {
        alert('已自动将订单内容复制到剪贴板，请将订单内容发送给QQ群1014424628内群主私聊窗口，默认会将商品放至距出生点10000格内随机地牢，如有需求请私聊备注');
    }).catch(err => {
        console.error('复制失败:', err);
        alert('复制失败，请手动复制以下内容：\n\n' + orderText);
    });
    
    // 关闭购物车
    closeCart();
}