// src/app/pages/eth/eth.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule, NgIf, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { WalletService } from '../../core/services/wallet.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'Eth',
  standalone: true,
  imports: [CommonModule, NgIf, AsyncPipe, FormsModule],
  templateUrl: './eth.html'
})
export class Eth implements OnInit {
  account$!: BehaviorSubject<string | null>;
  chainId$!: BehaviorSubject<number | null>;
  balance$!: BehaviorSubject<string>;

  sendTo: string = '';
  sendAmount: string = '';

  constructor(private walletService: WalletService) {}

  ngOnInit() {
    this.walletService.initProvider();

    // Asignar referencias después de que Angular inyecte walletService
    this.account$ = this.walletService.account$;
    this.chainId$ = this.walletService.chainId$;
    this.balance$ = this.walletService.balance$;
  }

  async connectWallet() {
    await this.walletService.connect();
  }

  async switchNetwork(chainId: number) {
    await this.walletService.switchChain(chainId);
  }

  async sendTransaction() {
    if (!this.sendTo || !this.sendAmount) return;
    try {
      const tx = await this.walletService.sendTransaction(this.sendTo, this.sendAmount);
      console.log('Transaction sent:', tx);
      alert('Transaction sent!');
    } catch (err) {
      console.error(err);
      alert('Transaction failed!');
    }
  }
}
