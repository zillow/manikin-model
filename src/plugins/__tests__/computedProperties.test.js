import { createModel, computed } from '../../index';

describe('get', () => {
  it('should retrieve the computed value when only a getter is provided', () => {
    const MyModel = createModel('MyModel', {
      firstName: '',
      lastName: '',
      fullName: computed(function computeFullName() {
        return `${this.get('firstName')} ${this.get('lastName')}`;
      })
    });

    const myInstance = new MyModel({
      firstName: 'Frank',
      lastName: 'McTom'
    });

    expect(myInstance.get('fullName')).toEqual('Frank McTom');
  });

  it('should retrieve the computed value when both a getter and setter are provided', () => {
    const MyModel = createModel('MyModel', {
      firstName: '',
      lastName: '',
      fullName: computed({
        get() {
          return `${this.get('firstName')} ${this.get('lastName')}`;
        },
        set() {}
      })
    });

    const myInstance = new MyModel({
      firstName: 'Frank',
      lastName: 'McTom'
    });

    expect(myInstance.get('fullName')).toEqual('Frank McTom');
  });

  it('should accept the parameter for the getter', () => {
    const MyModel = createModel('MyModel', {
      firstName: '',
      lastName: '',
      fullName: computed({
        get(nickName) {
          if (nickName) {
            return nickName;
          }
          return `${this.get('firstName')} ${this.get('lastName')}`;
        },
        set() {}
      })
    });

    const myInstance = new MyModel({
      firstName: 'Frank',
      lastName: 'McTom'
    });
    const nickName = 'Leo';

    expect(myInstance.get('fullName', nickName)).toEqual(nickName);
  });
});

describe('set', () => {
  it('should not allow setting the value when no setter is provided', () => {
    const MyModel = createModel('MyModel', {
      firstName: '',
      lastName: '',
      fullName: computed(function computeFullName() {
        return `${this.get('firstName')} ${this.get('lastName')}`;
      })
    });

    const myInstance = new MyModel({
      firstName: 'Frank',
      lastName: 'McTom'
    });

    expect(() => myInstance.set('fullName', 'boogers')).toThrow();
  });

  it('should run the provided setter', () => {
    const MyModel = createModel('MyModel', {
      firstName: '',
      lastName: '',
      fullName: computed({
        get() {
          return `${this.get('firstName')} ${this.get('lastName')}`;
        },
        set(value) {
          const names = value.split(' ');
          return this.setProperties({
            firstName: names[0],
            lastName: names[1]
          });
        }
      })
    });

    let myInstance = new MyModel({
      firstName: 'Frank',
      lastName: 'McTom'
    });

    myInstance = myInstance.set('fullName', 'Lil Wayne');
    expect(myInstance.get('firstName')).toEqual('Lil');
    expect(myInstance.get('lastName')).toEqual('Wayne');
  });

  it('should accept the 2nd parameter for the setter', () => {
    const MyModel = createModel('MyModel', {
      firstName: '',
      lastName: '',
      nickName: '',
      fullName: computed({
        get() {
          return `${this.get('firstName')} ${this.get('lastName')}`;
        },
        set(value, newNickName) {
          const names = value.split(' ');
          return this.setProperties({
            firstName: names[0],
            lastName: names[1],
            nickName: newNickName
          });
        }
      })
    });

    let myInstance = new MyModel({
      firstName: 'Frank',
      lastName: 'McTom'
    });

    myInstance = myInstance.set('fullName', 'Lil Wayne', 'Leo');
    expect(myInstance.get('firstName')).toEqual('Lil');
    expect(myInstance.get('lastName')).toEqual('Wayne');
    expect(myInstance.get('nickName')).toEqual('Leo');
  });

  it('should recompute the value and return it after running the setter', () => {
    const MyModel = createModel('MyModel', {
      firstName: '',
      lastName: '',
      fullName: computed({
        get() {
          return `${this.get('firstName')} ${this.get('lastName')}`;
        },
        set(value) {
          const names = value.split(' ');
          return this.setProperties({
            firstName: `fn: ${names[0]}`,
            lastName: `ln: ${names[1]}`
          });
        }
      })
    });

    const myInstance = new MyModel({
      firstName: 'Frank',
      lastName: 'McTom'
    });

    expect(myInstance.set('fullName', 'Lil Wayne').get('fullName')).toEqual(
      'fn: Lil ln: Wayne'
    );
  });
  describe('setProperties', () => {
    it('should compute the setter when using setProperties', () => {
      const MyModel = createModel('MyModel', {
        firstName: '',
        lastName: '',
        foo: 'bar',
        fullName: computed({
          get() {
            return `${this.get('firstName')} ${this.get('lastName')}`;
          },
          set(value) {
            const names = value.split(' ');
            return this.setProperties({
              firstName: `${names[0]}`,
              lastName: `${names[1]}`
            });
          }
        })
      });

      const myInstance = new MyModel({
        firstName: 'Frank',
        lastName: 'McTom'
      }).setProperties({
        foo: 'far',
        fullName: 'Lil Wayne'
      });

      expect(myInstance.get('firstName')).toEqual('Lil');
      expect(myInstance.get('lastName')).toEqual('Wayne');
      expect(myInstance.get('foo')).toEqual('far');
      expect(myInstance.get('fullName')).toEqual('Lil Wayne');
    });
    it('should throw when using setProperties for a property that has no setter', () => {
      const MyModel = createModel('MyModel', {
        firstName: '',
        lastName: '',
        foo: 'bar',
        fullName: computed(function computeFullName() {
          return `${this.get('firstName')} ${this.get('lastName')}`;
        })
      });

      const myInstance = new MyModel({
        firstName: 'Frank',
        lastName: 'McTom'
      });
      expect(() =>
        myInstance.setProperties({
          foo: 'far',
          fullName: 'Lil Wayne'
        })
      ).toThrow();
    });
  });
});
