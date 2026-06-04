import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Coin } from '../models/coin.model';

export interface CoinFilters {
  country: string;
  type: string;
  era: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class CoinService {
  private readonly DATA_URL = 'assets/data/coins.json';

  /** All coins loaded from JSON — never mutated */
  private allCoins: Coin[] = [];

  /** Active filter state */
  private filters$ = new BehaviorSubject<CoinFilters>({
    country: '',
    type: '',
    era: '',
    name: ''
  });

  /** Loading / error state */
  private loading$ = new BehaviorSubject<boolean>(false);
  private error$   = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {}

  /**
   * Fetches coins.json once and stores the result.
   * Returns an Observable of the full coin list.
   */
  loadCoins(): Observable<Coin[]> {
    this.loading$.next(true);
    this.error$.next(null);

    return this.http.get<Coin[]>(this.DATA_URL).pipe(
      tap({
        next: (coins) => {
          this.allCoins = coins;
          this.filters$.next(this.filters$.getValue());
          this.loading$.next(false);
        },
        error: (err) => {
          this.error$.next('Erro ao carregar moedas.');
          this.loading$.next(false);
          console.error('CoinService error:', err);
        }
      })
    );
  }

  /**
   * Returns an Observable that re-emits filtered coins
   * whenever the filters change.
   */
  getFilteredCoins(): Observable<Coin[]> {
    return this.filters$.pipe(
      map(filters => this.applyFilters(this.allCoins, filters))
    );
  }

  /** Update one or more filter fields */
  setFilters(partial: Partial<CoinFilters>): void {
    this.filters$.next({ ...this.filters$.getValue(), ...partial });
  }

  /** Reset all filters */
  clearFilters(): void {
    this.filters$.next({ country: '', type: '', era: '', name: '' });
  }

  getLoading(): Observable<boolean> { return this.loading$.asObservable(); }
  getError():   Observable<string | null> { return this.error$.asObservable(); }

  // ─── Private helpers ────────────────────────────────────────────────────────

  private applyFilters(coins: Coin[], filters: CoinFilters): Coin[] {
    return coins.filter(coin => {
      const matchCountry = !filters.country || coin.country === filters.country;
      const matchType    = !filters.type    || coin.type    === filters.type;
      const matchEra     = !filters.era     || coin.era     === filters.era;
      const matchName    = !filters.name    || coin.name.toLowerCase().includes(filters.name.toLowerCase());
      return matchCountry && matchType && matchEra && matchName;
    });
  }
}
