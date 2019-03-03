var viewModel = function() {
  var self = this;
  
  var supported_formats = [
    { name: 'SVG', shorthand: 'svg' },
    { name: 'PNG', shorthand: 'png' },
    { name: 'GIF', shorthand: 'gif' },
    { name: 'JPG', shorthand: 'jpg' },
  ];
  
  var quality_options = [
    { name: 'low [default]', shorthand: 'L' },
    { name: 'medium', shorthand: 'M' },
    { name: 'quality', shorthand: 'Q' },
    { name: 'high', shorthand: 'H' },
  ];
  
  self.QRtext = ko.observable('Hello world!');
  self.fg = ko.observable('000');
  self.bg = ko.observable('fff');
  self.quality = ko.observable('low');
  self.format = ko.observable('svg');
  self.quality_select = ko.observableArray(quality_options);
  self.format_select = ko.observableArray(supported_formats);
  
  self.QRlink = ko.computed(function() {
    var qr_link = '';
    
    if (self.QRtext() !== '') {
      qr_link = 'https://api.qrserver.com/v1/create-qr-code/?color=' + self.fg().replace('#', '') + '&bgcolor=' + self.bg().replace('#', '') + '&ecc=' + self.quality()['shorthand'] + '&format=' + self.format()['shorthand'] + '&data=' + self.QRtext();
    }

    return qr_link;
  });
  
  self.clearAll = function() {
    self.QRtext('');
    self.fg('');
    self.bg('');
  }
  
  // Ensure that updates are not too frequent
  self.QRlink.extend({ rateLimit: 100 });
}

ko.applyBindings(new viewModel());

$(function () {
  $('.color-select').colorpicker({
    useAlpha: false,
  });
});