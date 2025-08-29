// src/app/shared/components/modal-network.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule, NgIf, AsyncPipe } from '@angular/common';
import { WalletService } from '../../../core/services/wallet.service';
import { CHAINS } from '../../../core/helpers/chains.helper';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'ModalNetwork',
  standalone: true,
  imports: [CommonModule, NgIf, AsyncPipe, FormsModule],
  templateUrl: './modal.network.html',
  styleUrl: './modal.network.scss'
})
export class ModalNetwork {
  @Input() isOpen: boolean = false;

  chains = CHAINS;
  selectedChainId!: number;

  constructor(private walletService: WalletService) {
    // Inicializamos con la chainId actual
    this.walletService.chainId$.subscribe((id) => {
      if (id) this.selectedChainId = id;
    });
  }

  async switchChain(chainId: number) {
    await this.walletService.switchChain(chainId);
    this.isOpen = false; // cerrar modal tras cambio
  }

  close() {
    this.isOpen = false;
  }
}
