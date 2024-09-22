import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTooltipDirective]'
})
export class TooltipDirectiveDirective {
  @Input('appTooltipDirective') tooltipText!: string;

  private tooltipElement: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.tooltipElement = this.createTooltipElement();
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.showTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.hideTooltip();
  }

  private createTooltipElement(): HTMLElement {
    const tooltip = this.renderer.createElement('div');
    this.renderer.addClass(tooltip, 'tooltip');
    return tooltip;
  }

  private showTooltip() {
    if (!this.tooltipElement.parentElement) {
      this.renderer.appendChild(document.body, this.tooltipElement);
      this.updateTooltipPosition();
    }
  }

  private hideTooltip() {
    if (this.tooltipElement.parentElement) {
      this.renderer.removeChild(document.body, this.tooltipElement);
    }
  }

  private updateTooltipPosition() {
    const hostRect = this.el.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltipElement.getBoundingClientRect();

    const top = hostRect.top - tooltipRect.height - 10;
    const left = hostRect.left + hostRect.width / 2 - tooltipRect.width / 2;

    this.renderer.setStyle(this.tooltipElement, 'top', `${top}px`);
    this.renderer.setStyle(this.tooltipElement, 'left', `${left}px`);
    this.renderer.setProperty(this.tooltipElement, 'innerText', this.tooltipText);
  }
}
