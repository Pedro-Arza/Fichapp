import { ComponentFixture, TestBed, discardPeriodicTasks, fakeAsync, tick } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { Error404Component } from './error404';

describe('Error404Component', () => {
  let component: Error404Component;
  let fixture: ComponentFixture<Error404Component>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Error404Component],
      imports: [RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(Error404Component);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  // ─── Creación del componente ───────────────────────────────────────────────

  it('debería crearse correctamente', () => {
    expect(component).toBeTruthy();
  });

  // ─── Timestamp ────────────────────────────────────────────────────────────

  it('debería inicializar el timestamp al arrancar', () => {
    expect(component.timestamp).toBeTruthy();
    expect(component.timestamp).toContain('Sesión activa');
  });

  it('debería actualizar el timestamp cada segundo', fakeAsync(() => {
    const initialTimestamp = component.timestamp;
    tick(1000);
    fixture.detectChanges();
    expect(component.timestamp).not.toEqual('');
    // El formato contiene la fecha y "Sesión activa"
    expect(component.timestamp).toMatch(/\d{4}-\d{2}-\d{2} · \d{2}:\d{2}:\d{2} · Sesión activa/);
    discardPeriodicTasks();
  }));

  it('debería limpiar el intervalo al destruirse', fakeAsync(() => {
    spyOn(window, 'clearInterval').and.callThrough();
    fixture.destroy();
    expect(window.clearInterval).toHaveBeenCalled();
    discardPeriodicTasks();
  }));

  // ─── Navegación ───────────────────────────────────────────────────────────

  it('debería navegar a "/" al llamar goHome()', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('debería navegar a "/fichaje" al llamar goPanel()', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goPanel();
    expect(navigateSpy).toHaveBeenCalledWith(['/fichaje']);
  });

  // ─── Template ─────────────────────────────────────────────────────────────

  it('debería renderizar el código de error 404', () => {
    const el: HTMLElement = fixture.nativeElement;
    const errorCode = el.querySelector('.error-code');
    expect(errorCode).toBeTruthy();
    expect(errorCode?.textContent).toContain('404');
  });

  it('debería mostrar el título correcto', () => {
    const el: HTMLElement = fixture.nativeElement;
    const title = el.querySelector('.error-title');
    expect(title?.textContent).toContain('Esta ruta no existe en el sistema');
  });

  it('debería renderizar el botón "Volver al inicio"', () => {
    const el: HTMLElement = fixture.nativeElement;
    const buttons = el.querySelectorAll('.btn');
    const labels = Array.from(buttons).map(b => b.textContent?.trim());
    expect(labels.some(l => l?.includes('Volver al inicio'))).toBeTrue();
  });

  it('debería renderizar el botón "Panel de fichaje"', () => {
    const el: HTMLElement = fixture.nativeElement;
    const buttons = el.querySelectorAll('.btn');
    const labels = Array.from(buttons).map(b => b.textContent?.trim());
    expect(labels.some(l => l?.includes('Panel de fichaje'))).toBeTrue();
  });

  it('debería llamar goHome() al hacer click en "Volver al inicio"', () => {
    spyOn(component, 'goHome');
    const el: HTMLElement = fixture.nativeElement;
    const btn = el.querySelector<HTMLButtonElement>('.btn-primary');
    btn?.click();
    expect(component.goHome).toHaveBeenCalled();
  });

  it('debería llamar goPanel() al hacer click en "Panel de fichaje"', () => {
    spyOn(component, 'goPanel');
    const el: HTMLElement = fixture.nativeElement;
    const btn = el.querySelector<HTMLButtonElement>('.btn-ghost');
    btn?.click();
    expect(component.goPanel).toHaveBeenCalled();
  });

  it('debería mostrar el pill de estado "PÁGINA NO ENCONTRADA"', () => {
    const el: HTMLElement = fixture.nativeElement;
    const pill = el.querySelector('.status-pill');
    expect(pill?.textContent).toContain('PÁGINA NO ENCONTRADA');
  });

  it('debería mostrar el logo de MediTrack Hospital', () => {
    const el: HTMLElement = fixture.nativeElement;
    const logoName = el.querySelector('.logo-name');
    expect(logoName?.textContent).toContain('MediTrack Hospital');
  });
});