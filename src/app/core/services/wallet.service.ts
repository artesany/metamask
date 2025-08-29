// src/app/core/services/wallet.service.ts
import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs';
import { CHAINS, getChainById } from '../helpers/chains.helper';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private provider: ethers.BrowserProvider | null = null;
  private signer: ethers.Signer | null = null;

  public account$ = new BehaviorSubject<string | null>(null);
  public chainId$ = new BehaviorSubject<number | null>(null);
  public balance$ = new BehaviorSubject<string>('0');

  constructor() {
    // No acceder a window aquí para SSR
  }

  /** Inicializa el provider solo si existe ethereum */
  initProvider() {
    if (typeof window === 'undefined') return;

    const ethereum = (window as any).ethereum;
    if (!ethereum) {
      console.warn('No Ethereum provider found');
      return;
    }

    this.provider = new ethers.BrowserProvider(ethereum);
    this.setupListeners();
  }

  /** Configura listeners para accounts y chain changes */
  private setupListeners() {
    if (!this.provider) return;
    const ethereum = (window as any).ethereum;

    ethereum.on('accountsChanged', (accounts: string[]) => {
      this.account$.next(accounts[0] || null);
      this.refreshBalance();
    });

    ethereum.on('chainChanged', async (chainIdHex: string) => {
      console.log('Chain changed detected:', chainIdHex);

      // Reconstruir provider y signer al cambiar red
      if (typeof window !== 'undefined' && (window as any).ethereum) {
        this.provider = new ethers.BrowserProvider((window as any).ethereum);
        this.signer = await this.provider.getSigner();
      }

      const chainId = Number(BigInt(chainIdHex));
      this.chainId$.next(chainId);

      // Refrescar balance con el nuevo provider
      this.refreshBalance();
    });
  }

  /** Conecta wallet */
  async connect(): Promise<string | null> {
    if (!this.provider) return null;

    try {
      const accounts: string[] = await this.provider.send('eth_requestAccounts', []);
      const account = accounts[0] || null;
      this.account$.next(account);

      this.signer = await this.provider.getSigner();

      const network = await this.provider.getNetwork();
      this.chainId$.next(Number(network.chainId)); // bigint → number

      await this.refreshBalance();
      return account;
    } catch (err) {
      console.error('Wallet connection error:', err);
      return null;
    }
  }

  /** Cambia de red */
  async switchChain(targetChainId: number): Promise<boolean> {
    if (!this.provider) return false;
    const ethereum = (window as any).ethereum;
    const chainHex = '0x' + targetChainId.toString(16);

    try {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: chainHex }]
      });
      // Reconstruir provider y signer después del switch
      this.provider = new ethers.BrowserProvider(ethereum);
      this.signer = await this.provider.getSigner();
      this.chainId$.next(targetChainId);
      this.refreshBalance();
      return true;
    } catch (switchError: any) {
      if (switchError.code === 4902) {
        const chainInfo = getChainById(targetChainId);
        if (!chainInfo) return false;

        try {
          await ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: chainHex,
              chainName: chainInfo.name,
              rpcUrls: [chainInfo.rpcUrl],
              nativeCurrency: chainInfo.nativeCurrency
            }]
          });
          this.provider = new ethers.BrowserProvider(ethereum);
          this.signer = await this.provider.getSigner();
          this.chainId$.next(targetChainId);
          this.refreshBalance();
          return true;
        } catch (err) {
          console.error('Failed to add chain:', err);
          return false;
        }
      } else {
        console.error('Failed to switch chain:', switchError);
        return false;
      }
    }
  }

  /** Refresca balance usando provider.getBalance */
  async refreshBalance() {
    if (!this.provider || !this.account$.value) {
      this.balance$.next('0');
      return;
    }

    try {
      const balance = await this.provider.getBalance(this.account$.value);
      this.balance$.next(ethers.formatEther(balance));
    } catch (err: any) {
      console.warn('Error fetching balance:', err);
      this.balance$.next('0');
    }
  }

  /** Crea y envía transacción (value en string) */
  async sendTransaction(to: string, value: string) {
    if (!this.signer) {
      throw new Error('No signer available');
    }
    try {
      const tx = await this.signer.sendTransaction({
        to,
        value: ethers.parseEther(value) // value como string
      });
      return tx;
    } catch (err) {
      console.error('Transaction error:', err);
      throw err;
    }
  }
}
