import { Injectable } from '@nestjs/common';

@Injectable()
export class RandomUserService {
  async manipulatedAp(results: number, page: number) {
    const url = `https://randomuser.me/api?results=${results}&page=${page}`;

    const res = await fetch(url);
    const data = await res.json();

    const formated = data.results.map((user) => ({
      name: `${user.name.title}, ${user.name.first} ${user.name.last}`,
      location: `${user.location.street.number}, ${user.location.street.name}, ${user.location.city}, ${user.location.state}, ${user.location.country}`,
      email: user.email,
      age: user.dob.age,
      phone: user.phone,
      cell: user.cell,
      picture: [
        user.picture.large,
        user.picture.medium,
        user.picture.thumbnail,
      ],
    }));

    return {
      count: formated.length,
      users: formated,
    };
  }

  combineArray() {
    const colors = ['merah', 'kuning', 'hijau', 'pink', 'ungu'];

    //  Ini jika di push colors dengan warna maroon tinggal uncomment saja dan hasilnya sesuai dengan intruksi di soal
    // colors.push('maroon'); 

    const items = ['baju', 'celana', 'topi', 'jaket', 'sepatu'];
    const statusItem = ['Diskon', 'Sale', 'Diskon', 'Sale', 'Sale'];

    const maxLen = Math.max(colors.length, items.length, statusItem.length);
    const result: string[] = Array.from({ length: maxLen }).map((_, i) => {
      const item = items[i % items.length];
      const color = colors[i % colors.length];
      const sts = statusItem[i % statusItem.length];

      return `${this.capitalize(item)} ${this.capitalize(color)} ${sts}`;
    });

    return result;
  }
  capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
