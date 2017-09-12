import cart from './cart'

describe('reducers', () => {
  describe('cart', () => {
    const initialState = {
      addedIds: [],
      quantityById: {}
    }

    it('should provide the initial state', () => {
      expect(cart(undefined, {})).toEqual(initialState)
    })

    it('should handle CHECKOUT_REQUEST action', () => {
      expect(cart({}, { type: 'CHECKOUT_REQUEST' })).toEqual(initialState)
    })

    it('should handle CHECKOUT_FAILURE action', () => {
      expect(cart({}, { type: 'CHECKOUT_FAILURE', cart: 'cart state' })).toEqual('cart state')
    })

    it('should handle ADD_TO_CART action', () => {
      expect(cart(initialState, { type: 'ADD_TO_CART', productId: 1 })).toEqual({
        addedIds: [ 1 ],
        quantityById: { 1: 1 }
      })
    })

    describe('when product is already in cart', () => {
      it('should handle ADD_TO_CART action 1', () => {
        const state = {
          addedIds: [ 1, 2 ],
          quantityById: { 1: 1, 2: 1 }
        }

        expect(cart(state, { type: 'ADD_TO_CART', productId: 2 })).toEqual({
          addedIds: [ 1, 2 ],
          quantityById: { 1: 1, 2: 2 }
        })
      })

      it('should handle ADD_TO_CART action 2', () => {
        const state = {
          addedIds: [ 1, 2, 3 ],
          quantityById: { 1: 1, 2: 2, 3:3 }
        }

        expect(cart(state, { type: 'ADD_TO_CART', productId: 3 })).toEqual({
          addedIds: [ 1, 2, 3 ],
          quantityById: { 1: 1, 2: 2, 3:4 }
        })
      })

      it('should handle REMOVE_FROM_CART action 1', () => {
        const state = {
          addedIds: [ 1, 2 ],
          quantityById: { 1: 1, 2: 2 }
        }

        expect(cart(state, { type: 'REMOVE_FROM_CART', productId: 2 })).toEqual({
          addedIds: [ 1 ],
          quantityById: { 1: 1 }
        })
      })

      it('should handle REMOVE_FROM_CART action 2', () => {
        const state = {
          addedIds: [ 1, 2, 3, 4 ],
          quantityById: { 1: 1, 2: 2, 3: 2, 4: 5 }
        }

        expect(cart(state, { type: 'REMOVE_FROM_CART', productId: 1 })).toEqual({
          addedIds: [ 2, 3, 4 ],
          quantityById: { 2: 2, 3: 2, 4: 5 }
        })
      })

      it('should handle REMOVE_FROM_CART action 3', () => {
        const state = {
          addedIds: [ 1, 2, 3, 4 ],
          quantityById: { 1: 1, 2: 2, 3: 2, 4: 5 }
        }

        expect(cart(state, { type: 'REMOVE_FROM_CART', productId: 4 })).toEqual({
          addedIds: [ 1, 2, 3],
          quantityById: { 1: 1, 2: 2, 3: 2 }
        })
      })

    })
  })
})

import reducer, * as products from './products'

describe('reducers', () => {
  describe('products', () => {
    let state

    describe('when products are received', () => {

      beforeEach(() => {
        state = reducer({}, {
          type: 'RECEIVE_PRODUCTS',
          products: [
            {
              id: 1,
              title: 'Product 1',
              inventory: 2
            },
            {
              id: 2,
              title: 'Product 2',
              inventory: 1
            }
          ]
        })
      })

      it('contains the products from the action', () => {
        expect(products.getProduct(state, 1)).toEqual({
          id: 1,
          title: 'Product 1',
            inventory: 2
        })
        expect(products.getProduct(state, 2)).toEqual({
          id: 2,
          title: 'Product 2',
            inventory: 1
        })
      })

      it ('contains no other products', () => {
        expect(products.getProduct(state, 3)).toEqual(undefined)
      })

      it('lists all of the products as visible', () => {
        expect(products.getVisibleProducts(state)).toEqual([
          {
            id: 1,
            title: 'Product 1',
            inventory: 2
          }, {
            id: 2,
            title: 'Product 2',
            inventory: 1
          }
        ])
      })

      describe('when an item is added to the cart', () => {

        beforeEach(() => {
          state = reducer(state, { type: 'ADD_TO_CART', productId: 1 })
        })

        it('the inventory is reduced', () => {
          expect(products.getVisibleProducts(state)).toEqual([
            {
              id: 1,
              title: 'Product 1',
              inventory: 1
            }, {
              id: 2,
              title: 'Product 2',
              inventory: 1
            }
          ])
        })

      })

    })
  })
})