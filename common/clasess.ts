import {onMounted} from "@nuxtjs/composition-api";

export class Tringulo {
    public altura = 0;
    public base = 0;

    public area (): number {
      return this.altura * this.base
    }

    public setAltura (altura: number): void {
      this.altura = altura
    }

    public setBase (base: number): void {
      this.base = base
    }

    public getAltura (): number {
      return this.altura
    }

    public getBase (): number {
      return this.base
    }
}
//
// const cuadrado = {
//     base: 0,
//     altura: 0,
//     altura1: (altura: number, base: number) => {
//         cuadrado.altura = altura
//         cuadrado.base = base
//     },
//     area: () => {
//         return cuadrado.altura * cuadrado.base
//     }
// }
// onMounted(() => {
//     console.log('hola')
//     const figura = new Tringulo()
//     const figura2 = new Tringulo()
//     figura.setAltura(2)
//     figura.setBase(10)
//     console.log('f1', figura.getBase())
//     console.log('f1', figura.area())
//
//     figura2.setAltura(4)
//     figura2.setBase(50)
//     console.log('f2', figura2.getBase())
//     console.log('f2', figura2.area())
// })
